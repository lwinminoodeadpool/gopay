import { useState, useEffect } from 'react';
import { BatteryCharging, MapPin, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiGet, ENDPOINTS } from '../services/apiClient';

const ChargingStationList = () => {
    const navigate = useNavigate();
    const [stations, setStations] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
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
                    setTotalCount(list.length);

                    const mapped = list.map((item, index) => {
                        const chargingType = item.Bill_Payments__chargingType__CST ?? 'Standard';
                        return {
                            id: item.id ?? item._id ?? String(index),
                            name: item.name ?? `Station #${index + 1}`,
                            address: item.Bill_Payments__address__CST ?? 'Location unknown',
                            power: chargingType,
                            fast: chargingType.toLowerCase().includes('fast'),
                        };
                    });

                    // Show only 2 on the Home page
                    setStations(mapped.slice(0, 2));
                }
            } catch (err) {
                if (!cancelled) setError('Failed to load charging stations.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    return (
        <section className="mb-10 px-2 overflow-hidden">
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-lg font-bold text-primary tracking-tight">Charging Stations</h2>
                {!loading && !error && totalCount > 2 && (
                    <button
                        onClick={() => navigate('/charge')}
                        className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-all border-b border-blue-100 pb-0.5"
                    >
                        View All
                    </button>
                )}
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-[32px] border border-slate-50 gap-3">
                    <Loader2 size={24} className="animate-spin text-blue-600" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Searching...</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-5 bg-red-50/50 rounded-3xl border border-red-100/50 text-red-500">
                    <AlertCircle size={20} />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}

            {!loading && !error && stations.length === 0 && (
                <div className="text-center py-12 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200 text-gray-400 text-xs font-medium">
                    No charging stations found.
                </div>
            )}

            {!loading && !error && stations.length > 0 && (
                <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory pt-2 px-2 -mx-2 hide-scrollbar">
                    {stations.map((station) => (
                        <div
                            key={station.id}
                            className="min-w-[280px] bg-white rounded-[40px] p-6 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 snap-center relative group transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,84,166,0.12)] hover:border-blue-100"
                        >
                            {/* Status indicator */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md transition-transform group-hover:scale-110">
                                    <Zap size={18} fill="currentColor" strokeWidth={0} />
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-extrabold uppercase tracking-widest ${station.fast
                                        ? 'bg-orange-50 text-orange-600 border-orange-100'
                                        : 'bg-blue-50 text-blue-600 border-blue-100'
                                    }`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                    {station.fast ? 'Fast' : 'Standard'}
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-primary tracking-tight transition-colors group-hover:text-blue-800">{station.name}</h3>

                            <div className="flex items-center gap-2 mt-2 text-gray-400">
                                <MapPin size={14} className="shrink-0" />
                                <span className="text-[11px] font-medium truncate">{station.address}</span>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                                        Connector
                                    </p>
                                    <span className="text-xs font-black text-primary">
                                        {station.power}
                                    </span>
                                </div>

                                <button
                                    onClick={() => navigate('/charge')}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                                >
                                    Charge
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ChargingStationList;
