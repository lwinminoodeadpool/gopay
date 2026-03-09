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

                {!loading && !error && visibleSpots.map((spot, index) => {
                    const name = spot.Bill_Payments__name__CST ?? spot.name ?? `Spot #${index + 1}`;
                    const address = spot.Bill_Payments__address__CST ?? spot.address ?? '';
                    const price = spot.Bill_Payments__price__CST ?? spot.price ?? '';

                    return (
                        <div
                            key={spot._id ?? spot.id ?? index}
                            className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className="bg-ev-primary/10 p-2 rounded-lg text-ev-primary shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div className="truncate">
                                    <p className="font-bold text-primary truncate">{name}</p>
                                    {address && (
                                        <p className="text-xs text-gray-500 truncate">{address}</p>
                                    )}
                                </div>
                            </div>

                            {price && (
                                <div className="bg-ev-primary/10 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                                    <span className="text-xs font-bold text-ev-primary">{price} MMK/hr</span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {!loading && !error && hasMore && (
                    <button
                        onClick={() => navigate('/parking')}
                        className="w-full mt-2 py-3 bg-white border border-gray-100 rounded-2xl text-ev-primary font-bold text-sm shadow-sm hover:shadow hover:bg-ev-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        See More
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </section>
    );
};

export default ParkingManagement;
