import { useEffect, useState } from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';

const TOKEN_URL = '/kbzpay/baas/auth/v1.0/oauth2/token';
const PARKING_FETCH_URL = '/kbzpay/service/Bill_Payments__copay/0.0.1/parking_fetch';

const CLIENT_ID = 'c7d8640f6a20cce91bb1f670a41c8ffb';
const CLIENT_SECRET = 'b83dc4306aa20f8c349ce07ec3e7520e6b55723e5a52eeab';

async function fetchAccessToken() {
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
        const errText = await res.text();
        throw new Error(`Token request failed: ${res.status} — ${errText}`);
    }
    const data = await res.json();
    console.log('[ParkingManagement] Token response:', data); // debug — check field names
    // KBZPay may return access_token or token
    const token = data.access_token ?? data.token ?? data.data?.access_token ?? data.data?.token;
    if (!token) throw new Error('Token field not found in response: ' + JSON.stringify(data));
    return token;
}

async function fetchParkingData(token) {
    const res = await fetch(PARKING_FETCH_URL, {
        method: 'GET',
        headers: {
            'access-token': token,
        },
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error('[ParkingManagement] parking_fetch error body:', errText);
        throw new Error(`Parking fetch failed: ${res.status} — ${errText}`);
    }
    return res.json();
}

const ParkingManagement = () => {
    const [parkingList, setParkingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = await fetchAccessToken();
                const data = await fetchParkingData(token);

                if (!cancelled) {
                    // API returns { resCode: '0', result: { data: [...] } }
                    const list = data?.result?.data ?? data?.data ?? (Array.isArray(data) ? data : []);
                    setParkingList(list);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    return (
        <section className="mb-8">
            <div className="mt-6 flex flex-col gap-3">
                <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-1">
                    Go Pay Available Parking
                </h3>

                {loading && (
                    <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-sm">Loading parking spots…</span>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-500">
                        <AlertCircle size={18} />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {!loading && !error && parkingList.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No parking spots available right now.
                    </div>
                )}

                {!loading && !error && parkingList.map((spot, index) => {
                    const name = spot.Bill_Payments__name__CST ?? spot.name ?? spot.parking_name ?? `Spot #${index + 1}`;
                    const address = spot.Bill_Payments__address__CST ?? spot.address ?? spot.location ?? '';
                    const price = spot.Bill_Payments__price__CST ?? spot.price ?? '';

                    return (
                        <div
                            key={spot._id ?? spot.id ?? index}
                            className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-ev-primary/10 p-2 rounded-lg text-ev-primary">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-primary">{name}</p>
                                    {address && (
                                        <p className="text-xs text-gray-500">{address}</p>
                                    )}
                                </div>
                            </div>

                            {price && (
                                <div className="bg-ev-primary/10 px-3 py-1 rounded-full">
                                    <span className="text-xs font-bold text-ev-primary">{price} MMK/hr</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ParkingManagement;
