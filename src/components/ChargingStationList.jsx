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
        <section className="mb-8 relative min-h-[160px]">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-primary">Charging Stations</h2>
                {!loading && !error && totalCount > 2 && (
                    <button
                        onClick={() => navigate('/charge')}
                        className="text-sm font-bold text-ev-primary hover:text-ev-primary/80 transition-colors"
                    >
                        See All
                    </button>
                )}
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                    <Loader2 size={24} className="animate-spin text-ev-primary" />
                    <span className="text-xs font-bold">Checking stations...</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-500 text-sm">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {!loading && !error && stations.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No charging stations available.
                </div>
            )}

            {!loading && !error && stations.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory pt-2 pl-2 -ml-2 pr-2 hide-scrollbar">
                    {stations.map((station) => (
                        <div
                            key={station.id}
                            className="min-w-[260px] bg-white rounded-3xl p-5 shadow-sm border border-gray-50 snap-center relative overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Charger type badge */}
                            <div className="absolute top-0 right-0 p-3">
                                <div className={`p-2 rounded-bl-3xl rounded-tr-xl bg-gradient-to-br ${station.fast ? 'from-accent to-orange-400' : 'from-ev-secondary to-ev-primary'} text-white shadow-md`}>
                                    <Zap size={16} fill="currentColor" />
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-primary mr-10 truncate">{station.name}</h3>

                            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                <MapPin size={14} className="text-ev-primary" />
                                <span className="truncate">{station.address}</span>
                            </div>

                            <div className="mt-5 pt-3 border-t border-gray-50">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <BatteryCharging size={12} /> Charger Type
                                </p>
                                <span className="inline-block bg-ev-primary/10 text-ev-primary text-sm font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-ev-primary/20">
                                    {station.power}
                                </span>
                            </div>

                            <button
                                onClick={() => navigate('/charge')}
                                className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm bg-ev-primary text-secondary hover:bg-teal-700"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ChargingStationList;
