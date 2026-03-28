import { useEffect, useState } from 'react';
import { MapPin, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiGet, ENDPOINTS } from '../services/apiClient';

const ParkingManagement = () => {
    const navigate = useNavigate();
    const [parkingList, setParkingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await apiGet(ENDPOINTS.PARKING);

                if (!cancelled) {
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

    const visibleSpots = parkingList.slice(0, 3);
    const hasMore = parkingList.length > 3;

    return (
        <section className="mb-10 px-2">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-2">
                    <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                        Parking Locations
                    </h3>
                </div>

                {loading && (
                    <div className="flex items-center justify-center gap-2 py-8 text-gray-300">
                        <Loader2 size={18} className="animate-spin" />
                        <span className="text-xs font-medium uppercase tracking-wider">Updating...</span>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100/50 text-red-500">
                        <AlertCircle size={18} />
                        <span className="text-xs font-medium">{error}</span>
                    </div>
                )}

                {!loading && !error && parkingList.length === 0 && (
                    <div className="text-center py-10 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 text-gray-400 text-xs font-medium">
                        No parking spots available.
                    </div>
                )}

                <div className="grid gap-3">
                    {!loading && !error && visibleSpots.map((spot, index) => {
                        const name = spot.Bill_Payments__name__CST ?? spot.name ?? `Spot #${index + 1}`;
                        const address = spot.Bill_Payments__address__CST ?? spot.address ?? '';
                        const price = spot.Bill_Payments__price__CST ?? spot.price ?? '';

                        return (
                            <div
                                key={spot._id ?? spot.id ?? index}
                                className="group flex justify-between items-center bg-white p-4 rounded-[24px] shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-blue-100 hover:shadow-[0_10px_25px_-5px_rgba(0,84,166,0.08)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
                                        <MapPin size={20} className="stroke-[2.5px]" />
                                    </div>
                                    <div className="truncate">
                                        <p className="font-bold text-primary tracking-tight transition-colors group-hover:text-blue-700">{name}</p>
                                        {address && (
                                            <p className="text-[11px] text-gray-400 font-medium truncate mt-0.5">{address}</p>
                                        )}
                                    </div>
                                </div>

                                {price && (
                                    <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-colors group-hover:bg-blue-50 group-hover:border-blue-100">
                                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">{price} <span className="text-[9px] opacity-70">MMK/hr</span></span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {!loading && !error && hasMore && (
                    <button
                        onClick={() => navigate('/parking')}
                        className="w-full mt-1 py-3.5 bg-white border border-slate-100 rounded-[20px] text-blue-600 font-bold text-xs shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95"
                    >
                        Explore all locations
                        <ArrowRight size={14} className="stroke-[3px]" />
                    </button>
                )}
            </div>
        </section>
    );
};

export default ParkingManagement;
