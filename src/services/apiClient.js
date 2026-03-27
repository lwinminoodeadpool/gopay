/**
 * apiClient.js
 *
 * Centralised KBZPay API client.
 * Fetches an access token once and caches it until it expires.
 * All API calls across the app should import from this module.
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://uat-miniapp.kbzpay.com';

const TOKEN_URL = `${API_URL}/baas/auth/v1.0/oauth2/token`;

const CLIENT_ID = 'c7d8640f6a20cce91bb1f670a41c8ffb';
const CLIENT_SECRET = 'b83dc4306aa20f8c349ce07ec3e7520e6b55723e5a52eeab';

// In-memory token cache
let _cachedToken = null;
let _tokenExpiresAt = 0; // epoch ms

/**
 * Returns a valid access token.
 * Re-uses the cached token while it has > 60 s remaining,
 * otherwise performs a fresh auth request.
 */
export async function getAccessToken() {
    const now = Date.now();

    if (_cachedToken && now < _tokenExpiresAt - 60_000) {
        return _cachedToken;
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
    });

    const res = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    });

    if (!res.ok) {
        throw new Error(`Token request failed (HTTP ${res.status})`);
    }

    const json = await res.json();

    const token = (
        json.access_token ??
        json.token ??
        json.data?.access_token ??
        json.data?.token
    );

    if (!token) {
        throw new Error('Access token not found in auth response');
    }

    // `expires_in` is in seconds; default to 3600 s (1 h) if not provided
    const expiresIn = Number(json.expires_in ?? 3600);
    _cachedToken = token;
    _tokenExpiresAt = now + expiresIn * 1000;

    return token;
}

/**
 * Performs an authenticated GET request against the KBZPay backend.
 *
 * @param {string} path  - Proxy-relative path, e.g. '/kbzpay/service/...'
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiGet(path) {
    const token = await getAccessToken();

    const res = await fetch(path, {
        method: 'GET',
        headers: { 'access-token': token },
    });

    if (!res.ok) {
        throw new Error(`API GET ${path} failed (HTTP ${res.status})`);
    }

    return res.json();
}

/**
 * Performs an authenticated POST request against the KBZPay backend.
 *
 * @param {string} path  - Proxy-relative path, e.g. '/kbzpay/service/...'
 * @param {object} body  - The JSON request payload
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiPost(path, body = {}) {
    const token = await getAccessToken();

    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error(`API POST ${path} failed (HTTP ${res.status})`);
    }

    return res.json();
}

// ─── Endpoint constants ───────────────────────────────────────────────────────

export const ENDPOINTS = {
    PARKING: `${API_URL}/service/Bill_Payments__copay/0.0.1/parking_fetch`,
    PRODUCTS: `${API_URL}/service/Bill_Payments__copay/0.0.1/fetch_product`,
    EV_STATIONS: `${API_URL}/service/Bill_Payments__copay/0.0.1/evparking_fetch`,
    AUTOLOGIN: `${API_URL}/service/Bill_Payments__copay/0.0.1/autologin`,
};
