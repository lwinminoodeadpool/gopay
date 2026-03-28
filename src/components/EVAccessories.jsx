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
        <section className="mb-10 px-2 overflow-hidden">
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-lg font-bold text-primary tracking-tight">Accessories</h2>
                <Link
                    to="/explore"
                    className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-all border-b border-blue-100 pb-0.5 flex items-center pr-2"
                >
                    Shop All <ChevronRight size={14} className="ml-1" />
                </Link>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-10 bg-white rounded-[32px] border border-slate-50 gap-3">
                    <Loader2 size={24} className="animate-spin text-blue-600" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Loading...</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-5 bg-red-50/50 rounded-3xl border border-red-100/50 text-red-500">
                    <AlertCircle size={20} />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}

            {!loading && !error && accessories.length === 0 && (
                <div className="text-center py-10 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200 text-gray-400 text-xs font-medium">
                    No accessories available.
                </div>
            )}

            {!loading && !error && accessories.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 -mx-4 hide-scrollbar">
                    {accessories.map((item) => (
                        <div
                            key={item.id}
                            className="w-[164px] flex-shrink-0 bg-white rounded-[32px] p-4 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)] border border-slate-50 snap-start flex flex-col group relative transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(0,84,166,0.08)] hover:border-blue-100"
                        >
                            {/* Label badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className={`text-[8px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-lg uppercase shadow-sm ${item.label?.toLowerCase() === 'new' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-gray-500'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Product image */}
                            <div className="h-32 rounded-2xl bg-slate-50/50 w-full flex items-center justify-center mb-4 transition-transform duration-500 overflow-hidden group-hover:scale-105">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-4"
                                    onError={(e) => { e.currentTarget.src = defaultImage; }}
                                />
                            </div>

                            <div className="px-1 flex flex-col h-full">
                                <h3 className="font-bold text-xs text-primary leading-snug line-clamp-2 min-h-[32px] mb-2">{item.name}</h3>

                                <div className="mt-auto">
                                    <p className="font-extrabold text-[15px] text-blue-600 tracking-tight">
                                        {item.price.toLocaleString()} <span className="text-[9px] opacity-70 ml-0.5">MMK</span>
                                    </p>

                                    <Link
                                        to={`/explore?productId=${item.id}`}
                                        className="mt-4 w-full py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 hover:border-blue-100 transition-all flex items-center justify-center active:scale-95"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default EVAccessories;
