import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, BatteryCharging, Clock, Phone, Loader2, AlertCircle } from 'lucide-react';
import { apiGet, ENDPOINTS } from '../services/apiClient';

const EVFilterScreen = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiGet(ENDPOINTS.EV_STATIONS);

        if (!cancelled) {
          const list = data?.result?.data ?? data?.data ?? (Array.isArray(data) ? data : []);

          const mapped = list.map((item, index) => {
            let costStr = item.Bill_Payments__price__CST ?? '0';
            if (typeof costStr === 'string') costStr = costStr.replace(/[^\d.]/g, '');
            const price = parseFloat(costStr) || 0;

            return {
              id: item.id ?? item._id ?? String(index),
              name: item.name ?? `Station #${index + 1}`,
              address: item.Bill_Payments__address__CST ?? 'Location unknown',
              chargingType: item.Bill_Payments__chargingType__CST ?? 'Standard',
              direction: item.Bill_Payments__direction__CST ?? '',
              openTime: item.Bill_Payments__open_time__CST ?? 'Check hours',
              phone: item.Bill_Payments__phone_Number__CST ?? 'N/A',
              price,
            };
          });

          setStations(mapped);
        }
      } catch (err) {
        if (!cancelled) setError('Failed to load stations. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen bg-background-soft pb-40">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-50 border-b border-gray-50 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-primary tracking-tight">EV Stations</h1>
      </header>

      <main className="p-4 flex flex-col gap-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <Loader2 size={32} className="animate-spin text-ev-primary" />
            <span className="text-sm font-bold">Scanning for networks...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 rounded-3xl border border-red-100 text-red-500 text-center mx-2 gap-3">
            <AlertCircle size={32} className="text-red-400" />
            <div>
              <p className="font-bold text-lg mb-1">Connection Error</p>
              <p className="text-xs text-red-400/80">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && stations.length === 0 && (
          <div className="text-center py-16 text-gray-400 flex flex-col items-center gap-3">
            <BatteryCharging size={48} className="text-gray-200" />
            <p className="text-sm font-bold">No stations found in the area.</p>
          </div>
        )}

        {!loading && !error && stations.map((station) => (
          <div key={station.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col">
            {/* Station header */}
            <div className="flex justify-between items-start mb-3">
              <div className="min-w-0 pr-3">
                <h3 className="font-bold text-lg text-primary truncate">{station.name}</h3>
                <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                  <MapPin size={12} className="shrink-0" />
                  <span className="text-xs font-semibold truncate">{station.address}</span>
                </div>
              </div>
              <div className="bg-ev-primary/10 text-ev-primary px-3 py-1 rounded-2xl shrink-0 border border-ev-primary/20">
                <span className="text-[10px] font-black uppercase tracking-wider">{station.chargingType}</span>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 mt-2">
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl">
                <Clock size={16} className="text-primary/40 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">Hours</p>
                  <p className="text-xs font-black text-primary">{station.openTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl">
                <Phone size={16} className="text-primary/40 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">Contact</p>
                  <p className="text-xs font-black text-primary truncate">{station.phone}</p>
                </div>
              </div>
            </div>

            {/* Rate row */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-0.5">Rate</p>
                <p className="font-black text-lg text-ev-primary tracking-tight">
                  1 Unit / {station.price.toLocaleString()} Ks
                </p>
              </div>
              {station.direction && (
                <span className="text-xs font-bold text-gray-400">{station.direction}</span>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EVFilterScreen;
