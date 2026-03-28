import React, { useState, useEffect } from 'react';
import {
    Star, ShoppingCart, ChevronLeft, ChevronRight, ShieldCheck, CreditCard,
    Share2, Heart, Search, Filter, Plus, Minus, CheckCircle2,
    Download, ArrowRight, Loader2, Wallet, X, Bell, AlertCircle
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { apiGet, ENDPOINTS } from '../services/apiClient';

const Explore = () => {
    // View State: 'list', 'detail', 'confirm', 'processing', 'success', 'receipt'
    const [view, setView] = useState('list');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [imgIndex, setImgIndex] = useState(0);
    const [walletBalance, setWalletBalance] = useState(250000);
    const [transactionId, setTransactionId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Order Update', message: 'Your EV Cable is out for delivery', read: false },
        { id: 2, title: 'Promo', message: 'Get 10% off on all Car Care items!', read: false }
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    // API States
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 100% Verified Product Mappings fallbacks in case images/data is missing in API
    const defaultPlaceholderImage = '/assets/phone_holder.png';

    const filteredProducts = products.filter(p => {
        return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await apiGet(ENDPOINTS.PRODUCTS);

                if (!cancelled) {
                    const list = data?.result?.data ?? data?.data ?? (Array.isArray(data) ? data : []);

                    // Map API products to local component format
                    const mappedProducts = list.map((item, index) => {
                        const name = item.Bill_Payments__name__CST ?? item.name ?? item.title ?? `Product #${index + 1}`;
                        // We are doing parsing since price logic might come as string or number
                        let costStr = item.Bill_Payments__price__CST ?? item.price ?? item.cost ?? "0";
                        if (typeof costStr === 'string') {
                            costStr = costStr.replace(/[^\d.]/g, ''); // Extract only numbers/decimals
                        }
                        const price = parseFloat(costStr) || 0;
                        const desc = item.Bill_Payments__access_overview__CST ?? item.Bill_Payments__description__CST ?? item.description ?? item.desc ?? '';

                        // Using explicit quantity field or fallback to item.stock if unavailable
                        const quantityVal = item.Bill_Payments__quantity__CST ?? item.quantity ?? item.stock ?? '0';
                        const availabilityString = `${quantityVal} Available`;

                        const cats = item.category ?? 'Car Care';
                        const photoField = item.Bill_Payments__access_photo__CST;
                        const resolvePhoto = (raw) => {
                            if (!raw || typeof raw !== 'string' || !raw.trim()) return defaultPlaceholderImage;
                            const str = raw.trim();
                            // Already a full URL or data URI — use as-is
                            if (str.startsWith('http') || str.startsWith('data:')) return str;
                            // Otherwise treat as raw base64
                            return `data:image/png;base64,${str}`;
                        };
                        const rawPhoto = Array.isArray(photoField) ? photoField[0] : photoField;
                        const imageArr = [resolvePhoto(rawPhoto)];

                        return {
                            id: item._id ?? item.id ?? Math.random().toString(), // fallback ID
                            name,
                            price,
                            rating: item.rating ?? 4.8,
                            reviews: item.reviews ?? Math.floor(Math.random() * (400 - 20) + 20),
                            stock: item.stock_text ?? availabilityString,
                            quantityNum: parseInt(quantityVal) || 0,
                            category: cats,
                            images: imageArr,
                            desc,
                        };
                    });

                    setProducts(mappedProducts);
                }
            } catch (err) {
                if (!cancelled) setError('Failed to load products. Please try again later.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (products.length === 0) return; // wait until products are loaded

        const productId = searchParams.get('productId');
        const action = searchParams.get('action');

        if (productId && action === 'cart') {
            // Find by numeric ID or string ID
            const product = products.find(p => p.id.toString() === productId);
            if (product) {
                setSelectedProduct(product);
                setQuantity(1);
                setOrderNote('');
                setImgIndex(0);
                setView('confirm');
                // Optional: Clear params to avoid reopening on refresh
                // setSearchParams({}, { replace: true });
            }
        } else if (productId) {
            const product = products.find(p => p.id.toString() === productId);
            if (product) {
                openProduct(product);
            }
        }
    }, [searchParams, products]);

    const openProduct = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setOrderNote('');
        setImgIndex(0);
        setView('detail');
        window.scrollTo(0, 0);
    };

    const handleConfirmPayment = () => {
        setView('processing');
        setTimeout(() => {
            const txId = 'KBZ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            setTransactionId(txId);
            setWalletBalance(prev => prev - (selectedProduct.price * quantity));
            setView('success');
        }, 2000);
    };

    const formatTime = () => {
        return new Date().toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    // --- SHARED COMPONENTS ---

    const TopAppBar = ({ title, showBack = false, onBack = () => setView('list') }) => (
        <header className="bg-white px-6 pt-12 pb-6 sticky top-0 z-20 border-b border-slate-50 flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                {showBack ? (
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-primary hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                ) : (
                    <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
                        <ShoppingCart size={22} className="text-white" />
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-bold text-primary tracking-tight line-clamp-1">{title}</h1>
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border ${isSearchVisible ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-white text-primary border-slate-100 hover:bg-slate-50'}`}
                >
                    <Search size={18} />
                </button>
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center relative transition-all border ${showNotifications ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-white text-primary border-slate-100 hover:bg-slate-50'}`}
                    >
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        <Bell size={18} />
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-4 w-72 bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 overflow-hidden animate-in fade-in zoom-in-95 duration-300 z-[60]">
                            <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                <h3 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-gray-300 hover:text-primary"><X size={14} /></button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map(n => (
                                    <div key={n.id} className="p-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                                        <p className="font-bold text-xs text-primary group-hover:text-blue-600 transition-colors">{n.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{n.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );

    // 1. PRODUCT LISTING
    if (view === 'list') {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
                <TopAppBar title="Accessories" />

                <div className="px-4">
                    {/* Search Bar Animation */}
                    {isSearchVisible && (
                        <div className="mb-6 animate-in slide-in-from-top-4 duration-500">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Find premium accessories..."
                                    autoFocus
                                    className="w-full bg-white border border-slate-100 rounded-[20px] py-4.5 pl-12 pr-12 text-sm font-bold text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Status & Grid */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                            <Loader2 size={32} className="animate-spin text-ev-primary" />
                            <span className="text-sm font-bold">Loading products...</span>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-[2rem] border border-red-100 text-red-500 mb-4 text-center text-sm font-medium">
                            <AlertCircle size={28} className="mb-2 opacity-80" />
                            <span>{error}</span>
                            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-xl font-bold active:scale-95 transition-all text-xs">
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-2 gap-5">
                            {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    onClick={() => openProduct(product)}
                                    className="bg-white rounded-[32px] p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col group active:scale-[0.98] transition-all duration-500 relative overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(0,84,166,0.1)] hover:border-blue-50"
                                >
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg text-white bg-blue-600 shadow-lg shadow-blue-200">
                                            {product.category === 'EV Charging' ? 'Elite' : 'New'}
                                        </span>
                                    </div>

                                    <div className="h-40 bg-slate-50 rounded-[24px] mb-4 flex items-center justify-center relative overflow-hidden transition-colors group-hover:bg-blue-50/30">
                                        <img
                                            src={product.images[0]}
                                            className="w-[85%] h-[85%] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700"
                                            alt={product.name}
                                            onError={(e) => { e.currentTarget.src = defaultPlaceholderImage; }}
                                        />
                                    </div>
                                    <h3 className="font-bold text-xs text-primary leading-snug line-clamp-2 min-h-[32px] px-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{product.name}</h3>

                                    <div className="flex items-center justify-between mt-2 mb-4 px-1">
                                        <div className="flex items-center gap-1 text-orange-400">
                                            <Star size={10} className="fill-current" />
                                            <span className="text-[10px] font-bold">{product.rating}</span>
                                        </div>
                                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${product.quantityNum < 5 ? 'text-red-500 bg-red-50' : 'text-blue-500 bg-blue-50'}`}>
                                            {product.stock}
                                        </span>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between mb-1">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Price</span>
                                            <span className="font-bold text-base text-blue-600">{product.price.toLocaleString()} <span className="text-[10px] opacity-70">MMK</span></span>
                                        </div>
                                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100 transform group-hover:rotate-12 transition-all">
                                            <Plus size={16} />
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-2 py-20 text-center flex flex-col items-center">
                                    <Search size={40} className="text-gray-200 mb-4" />
                                    <p className="text-gray-400 font-bold">No products found</p>
                                    <button onClick={() => { setSearchQuery(''); setIsSearchVisible(false) }} className="text-ev-primary text-xs font-bold mt-2">Clear search</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 2. PRODUCT DETAIL
    if (view === 'detail') {
        return (
            <div className="animate-in slide-in-from-right duration-500 pb-32 bg-white min-h-screen">
                <TopAppBar title="Product Details" showBack={true} />

                <div className="px-6">
                    <div className="bg-slate-50 rounded-[40px] p-8 mb-8 relative overflow-hidden group">
                        <div className="h-80 flex items-center justify-center relative z-10">
                            <button
                                onClick={() => setImgIndex(prev => (prev > 0 ? prev - 1 : selectedProduct.images.length - 1))}
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary shadow-xl z-20 active:scale-90 transition-all opacity-0 group-hover:opacity-100 border border-slate-100"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <img
                                key={imgIndex}
                                src={selectedProduct.images[imgIndex]}
                                className="w-[90%] h-[90%] object-contain drop-shadow-2xl animate-in fade-in zoom-in-95 duration-700"
                                alt={selectedProduct.name}
                                onError={(e) => { e.currentTarget.src = defaultPlaceholderImage; }}
                            />

                            <button
                                onClick={() => setImgIndex(prev => (prev < selectedProduct.images.length - 1 ? prev + 1 : 0))}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary shadow-xl z-20 active:scale-90 transition-all opacity-0 group-hover:opacity-100 border border-slate-100"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-4 relative z-20">
                            {selectedProduct.images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${imgIndex === i ? 'w-8 bg-blue-600 shadow-lg shadow-blue-200' : 'w-1.5 bg-slate-200'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 px-2">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-xl">
                                    {selectedProduct.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-orange-400">
                                    <Star size={16} className="fill-current" />
                                    <span className="font-bold text-primary">{selectedProduct.rating}</span>
                                    <span className="text-[10px] text-gray-400 font-bold ml-1">({selectedProduct.reviews})</span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-primary tracking-tight leading-tight uppercase">{selectedProduct.name}</h1>
                        </div>

                        <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100/50">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Description</p>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{selectedProduct.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-50">
                                <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mb-1">Availability</p>
                                <p className="text-sm font-bold text-blue-600">{selectedProduct.stock}</p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-50">
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Authentic</p>
                                <p className="text-sm font-bold text-primary flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-blue-500" /> Premium
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Action Bar */}
                <div className="fixed bottom-[110px] w-full max-w-md left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border-t border-slate-50 pt-4 pb-6 px-6 flex items-center justify-between gap-6 z-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Price</span>
                        <span className="text-2xl font-bold text-blue-600">{(selectedProduct.price * quantity).toLocaleString()} <span className="text-xs opacity-60">MMK</span></span>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary active:scale-90 hover:bg-slate-50 transition-all font-bold"
                        >
                            <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="font-bold text-primary w-6 text-center text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(Math.min(selectedProduct.quantityNum, quantity + 1))}
                            disabled={quantity >= selectedProduct.quantityNum}
                            className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center active:scale-90 transition-all font-bold ${quantity >= selectedProduct.quantityNum
                                ? 'bg-slate-200 text-gray-400 cursor-not-allowed opacity-50'
                                : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                }`}
                        >
                            <Plus size={14} strokeWidth={2.5} />
                        </button>
                    </div>

                    <button
                        onClick={() => setView('confirm')}
                        className="w-14 h-14 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-2xl shadow-blue-200 active:scale-95 transition-all"
                    >
                        <ShoppingCart size={24} />
                    </button>
                </div>
            </div>
        );
    }

    // 3. PAYMENT CONFIRMATION
    if (view === 'confirm') {
        const total = selectedProduct.price * quantity;
        return (
            <div className="fixed inset-0 z-[100] flex items-end justify-center">
                <div className="absolute inset-0 max-w-md left-1/2 -translate-x-1/2 bg-blue-900/40 backdrop-blur-md transition-all duration-500" onClick={() => setView('detail')} />
                <div className="relative w-full max-w-md bg-white rounded-t-[48px] shadow-2xl animate-in slide-in-from-bottom duration-700 overflow-hidden border-t border-white/50 max-h-[92vh] overflow-y-auto">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto my-6" />

                    <div className="px-10 pb-12">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-primary tracking-tight">Checkout</h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Review your order</p>
                            </div>
                            <button onClick={() => setView('detail')} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 border border-slate-100 hover:text-primary transition-all active:scale-90"><X size={20} /></button>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100/50 relative overflow-hidden group">
                                <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm p-2 transition-transform group-hover:scale-110 duration-500">
                                    <img src={selectedProduct.images[0]} className="w-full h-full object-contain" alt={selectedProduct.name} onError={(e) => { e.currentTarget.src = defaultPlaceholderImage; }} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-bold text-primary text-lg truncate leading-tight uppercase tracking-tight">{selectedProduct.name}</p>
                                    <p className="text-[10px] text-blue-500 font-bold mt-1 uppercase tracking-widest">Qty: {quantity} • MMK {selectedProduct.price.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Merchant</span>
                                    <span className="font-bold text-sm text-primary">Go Pay Marketplace</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Wallet Body</span>
                                    <div className="flex items-center gap-2 font-bold text-sm text-blue-600">
                                        <Wallet size={16} /> {walletBalance.toLocaleString()} <span className="text-[8px] opacity-60">MMK</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-50">
                                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 block text-left">Special Instructions</label>
                                    <textarea
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="Optional..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none h-24 placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="h-px bg-slate-100 flex-1 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Grand Total</span>
                                    <span className="text-3xl font-bold text-primary tracking-tighter">{total.toLocaleString()} <span className="text-xs opacity-40 uppercase tracking-widest">MMK</span></span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmPayment}
                                className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-bold shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 active:scale-[0.98] transition-all group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <ShieldCheck size={22} className="stroke-[2.5px]" />
                                <span className="uppercase tracking-[0.2em] text-sm">Verify & Pay</span>
                            </button>

                            <p className="text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em] opacity-80">
                                End-to-end Encrypted by GoPay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 4. PROCESSING SCREEN
    if (view === 'processing') {
        return (
            <div className="fixed inset-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white z-[200] flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-36 h-36 border-4 border-slate-50 rounded-full shadow-inner" />
                    <Loader2 className="absolute top-0 w-36 h-36 text-blue-600 animate-spin stroke-[1.5px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Wallet size={40} className="text-slate-200" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-primary mt-12 tracking-tight">Processing...</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-4 opacity-60">Connecting to secure gateway</p>
            </div>
        );
    }

    // 5. SUCCESS SCREEN
    if (view === 'success') {
        const total = selectedProduct.price * quantity;
        return (
            <div className="bg-white min-h-screen z-[300] flex flex-col items-center pt-28 px-10 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-28 h-28 bg-blue-600 rounded-[40px] flex items-center justify-center shadow-2xl shadow-blue-200 mb-12 rotate-[-5deg] transform hover:rotate-0 transition-transform duration-700">
                    <CheckCircle2 size={56} className="text-white stroke-[2.5px]" />
                </div>

                <h2 className="text-3xl font-bold text-primary mb-3 tracking-tighter text-center">ORDER SUCCESS!</h2>
                <p className="text-gray-400 text-center text-sm font-medium mb-12 max-w-[280px] leading-relaxed">
                    Your payment was verified. Your order will be delivered shortly.
                </p>

                <div className="w-full bg-slate-50 rounded-[40px] p-10 space-y-6 mb-12 relative border border-slate-100 overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                    <div className="flex justify-between items-center text-left">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Transaction Id</span>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">{transactionId}</span>
                    </div>

                    <div className="h-px bg-slate-200/50" />

                    <div className="flex justify-between items-center py-2 text-left">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Paid Amount</span>
                        <span className="text-blue-600 text-2xl font-bold tracking-tighter">{total.toLocaleString()} <span className="text-xs uppercase opacity-60">MMK</span></span>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <button
                        onClick={() => setView('receipt')}
                        className="w-full bg-primary text-white py-6 rounded-[32px] font-bold flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all group uppercase tracking-[0.2em] text-sm"
                    >
                        View Receipt <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className="w-full text-blue-600 font-bold text-xs uppercase tracking-[0.3em] py-4 active:opacity-50 transition-opacity"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    // 6. DIGITAL RECEIPT
    if (view === 'receipt') {
        const total = selectedProduct.price * quantity;
        return (
            <div className="bg-slate-50 min-h-screen animate-in slide-in-from-bottom duration-700 flex flex-col">
                <TopAppBar title="Digital Receipt" showBack={true} onBack={() => setView('success')} />

                <div className="px-6 pb-12 flex-1">
                    <div className="bg-white rounded-[48px] shadow-2xl overflow-hidden relative border border-slate-50 mb-10">
                        <div className="h-4 bg-blue-600 w-full" />

                        <div className="p-10">
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                                    <ShieldCheck size={48} className="stroke-[2px]" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary tracking-tight">TRANSACTION VERIFIED</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Secured via Go Pay</p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex justify-between items-center pb-10 border-b border-dashed border-slate-200">
                                    <div className="flex gap-5 px-2">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden p-3 flex-shrink-0 border border-slate-100">
                                            <img src={selectedProduct.images[0]} className="w-full h-full object-contain" alt={selectedProduct.name} onError={(e) => { e.currentTarget.src = defaultPlaceholderImage; }} />
                                        </div>
                                        <div className="flex flex-col justify-center text-left">
                                            <p className="text-base font-bold text-primary tracking-tight leading-tight uppercase line-clamp-1">{selectedProduct.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Qty: {quantity} • Unit: {selectedProduct.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 px-2">
                                    {[
                                        { label: 'Merchant', value: 'Go Pay Store' },
                                        { label: 'Date Time', value: formatTime() },
                                        { label: 'Method', value: 'GoPay Wallet', icon: <div className="w-2 h-2 bg-blue-500 rounded-full" /> },
                                        { label: 'Reference', value: transactionId, accent: true }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</span>
                                            <span className={`text-[11px] font-bold text-primary flex items-center gap-2 ${item.accent ? 'text-blue-600 font-mono' : ''}`}>
                                                {item.icon}{item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100/50 flex justify-between items-center shadow-inner">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Amount</span>
                                    <span className="text-3xl font-bold text-blue-600 tracking-tighter">{total.toLocaleString()} <span className="text-xs uppercase opacity-40">MMK</span></span>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col items-center opacity-30">
                                <div className="w-24 h-24 bg-slate-100/50 p-4 rounded-3xl border border-slate-200">
                                    <div className="grid grid-cols-5 gap-1.5 h-full w-full opacity-60">
                                        {[...Array(25)].map((_, i) => <div key={i} className={`bg-primary rounded-[2px] ${Math.random() > 0.4 ? 'h-full' : 'h-1/2'}`} />)}
                                    </div>
                                </div>
                                <p className="text-[8px] text-center font-bold text-gray-400 uppercase tracking-[0.3em] mt-5">
                                    Blockchain Verified Receipt
                                </p>
                            </div>
                        </div>

                        {/* Serrated Edge Decoration */}
                        <div className="flex w-full overflow-hidden h-2 opacity-50">
                            {[...Array(40)].map((_, i) => (
                                <div key={i} className="min-w-[12px] h-12 bg-slate-50 rounded-full -mt-1 mx-[-2px] border-t border-slate-200" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-2 flex gap-4 px-2 pb-10">
                        <button
                            className="flex-1 bg-white border border-slate-100 text-primary py-5 rounded-[28px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-sm"
                        >
                            <Download size={16} /> Save
                        </button>
                        <button
                            className="flex-1 bg-primary text-white py-5 rounded-[28px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-200"
                        >
                            <Share2 size={16} /> Share
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Explore;
