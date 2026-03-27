import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { apiGet, ENDPOINTS } from '../services/apiClient';

const EVAccessories = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultImage = '/assets/phone_holder.png';

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await apiGet(ENDPOINTS.PRODUCTS);

                if (!cancelled) {
                    const list = data?.result?.data ?? data?.data ?? (Array.isArray(data) ? data : []);

                    const mapped = list.map((item, index) => {
                        let costStr = item.Bill_Payments__price__CST ?? item.price ?? '0';
                        if (typeof costStr === 'string') costStr = costStr.replace(/[^\d.]/g, '');
                        const price = parseFloat(costStr) || 0;

                        const photoField = item.Bill_Payments__access_photo__CST;
                        const resolvePhoto = (raw) => {
                            if (!raw || typeof raw !== 'string' || !raw.trim()) return defaultImage;
                            const str = raw.trim();
                            // Already a full URL or data URI — use as-is
                            if (str.startsWith('http') || str.startsWith('data:')) return str;
                            // Otherwise treat as raw base64
                            return `data:image/png;base64,${str}`;
                        };
                        const rawPhoto = Array.isArray(photoField) ? photoField[0] : photoField;
                        const imageArr = [resolvePhoto(rawPhoto)];

                        return {
                            id: item.id ?? item._id ?? String(index),
                            name: item.Bill_Payments__name__CST ?? item.name ?? `Product #${index + 1}`,
                            price,
                            image: imageArr[0],
                            label: item.category ?? (index < 2 ? 'New' : 'Top'),
                        };
                    });

                    setAccessories(mapped.slice(0, 5));
                }
            } catch (err) {
                if (!cancelled) setError('Failed to load accessories.');
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
                <h2 className="text-xl font-bold text-primary">Accessories</h2>
                <Link
                    to="/explore"
                    className="text-sm font-bold text-ev-primary hover:text-ev-primary/80 transition-colors flex items-center pr-2"
                >
                    Shop All <ChevronRight size={16} className="ml-0.5 relative top-[1px]" />
                </Link>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                    <Loader2 size={24} className="animate-spin text-ev-primary" />
                    <span className="text-xs font-bold">Loading accessories...</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-500 text-sm">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {!loading && !error && accessories.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No accessories available right now.
                </div>
            )}

            {!loading && !error && accessories.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 -mx-2 hide-scrollbar">
                    {accessories.map((item) => (
                        <div
                            key={item.id}
                            className="w-[150px] flex-shrink-0 bg-white rounded-3xl p-3 shadow-sm border border-gray-100 snap-start flex flex-col group relative overflow-hidden"
                        >
                            {/* Label badge */}
                            <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-24px)]">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm truncate block ${item.label?.toLowerCase() === 'new' ? 'bg-accent text-primary' : 'bg-primary text-white'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Product image */}
                            <div className="h-32 rounded-2xl bg-gray-50 w-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-500 overflow-hidden shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-2"
                                    onError={(e) => { e.currentTarget.src = '/assets/phone_holder.png'; }}
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <h3 className="font-bold text-sm text-primary leading-tight line-clamp-2 min-h-[40px] px-1">{item.name}</h3>
                                <p className="font-black text-[15px] mt-1 text-ev-primary px-1 truncate shrink-0">
                                    {item.price.toLocaleString()} <span className="text-[10px]">MMK</span>
                                </p>

                                <Link
                                    to={`/explore?productId=${item.id}`}
                                    className="mt-3 bg-gray-50 text-primary py-2 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center w-full"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default EVAccessories;
