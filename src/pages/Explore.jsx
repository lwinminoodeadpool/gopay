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
                        const desc = item.Bill_Payments__description__CST ?? item.description ?? item.desc ?? 'Great automotive accessories that will amplify my ride.';

                        // Using explicit quantity field or fallback to item.stock if unavailable
                        const quantityVal = item.Bill_Payments__quantity__CST ?? item.quantity ?? item.stock ?? '0';
                        const availabilityString = `${quantityVal} Available`;

                        const cats = item.category ?? 'Car Care';
                        const imageArr = item.images && Array.isArray(item.images) && item.images.length > 0
                            ? item.images
                            : [defaultPlaceholderImage, defaultPlaceholderImage, defaultPlaceholderImage];

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
                            features: Array.isArray(item.features) ? item.features : ['Durable Design', 'Verified Partner', 'Quality Guarantee'],
                            compatibility: item.compatibility ?? 'Universal compatibility'
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
        <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 border-b border-gray-50 flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                {showBack ? (
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                ) : (
                    <div className="bg-ev-primary p-2 rounded-xl shadow-lg shadow-ev-primary/20">
                        <ShoppingCart size={24} className="text-secondary" />
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-black text-primary tracking-tight line-clamp-1">{title}</h1>
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all border ${isSearchVisible ? 'bg-ev-primary text-secondary border-ev-primary' : 'bg-white text-primary border-gray-100'}`}
                >
                    <Search size={20} />
                </button>
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm relative transition-all border ${showNotifications ? 'bg-ev-primary text-secondary border-ev-primary' : 'bg-white text-primary border-gray-100'}`}
                    >
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-status-danger rounded-full border-2 border-white animate-pulse"></span>
                        <Bell size={20} />
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[60]">
                            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-black text-xs text-primary uppercase tracking-widest">Alerts</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-gray-400"><X size={14} /></button>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {notifications.map(n => (
                                    <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                        <p className="font-bold text-xs text-primary">{n.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">{n.message}</p>
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
                        <div className="mb-4 animate-in slide-in-from-top-4 duration-300">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    autoFocus
                                    className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-ev-primary/20 transition-all"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
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
                        <div className="grid grid-cols-2 gap-4">
                            {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    onClick={() => openProduct(product)}
                                    className="bg-white rounded-[2rem] p-3 shadow-sm border border-gray-100 flex flex-col group active:scale-[0.97] transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white bg-primary shadow-sm">
                                            {product.category === 'EV Charging' ? 'Fast' : 'Top'}
                                        </span>
                                    </div>

                                    <div className="h-36 bg-gray-50 rounded-2xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                        <img src={product.images[0]} className="w-full h-full object-contain p-4" alt={product.name} />
                                    </div>
                                    <h3 className="font-bold text-sm text-primary leading-tight line-clamp-2 min-h-[40px] px-1">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-1 mb-2 px-1">
                                        <div className="flex items-center gap-1">
                                            <Star size={10} className="fill-accent text-accent" />
                                            <span className="text-[10px] text-gray-400 font-bold">{product.rating}</span>
                                        </div>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${product.quantityNum < 5 ? 'text-status-danger border-status-danger/30 bg-status-danger/5' : 'text-status-success border-status-success/30 bg-status-success/5'}`}>
                                            {product.stock}
                                        </span>
                                    </div>
                                    <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between px-1">
                                        <span className="font-black text-lg text-ev-primary">{product.price.toLocaleString()} <span className="text-[10px]">MMK</span></span>
                                    </div>
                                    <button className="mt-3 w-full bg-gray-50 text-primary py-2 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all duration-300 transform active:scale-95">
                                        Shop
                                    </button>
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
            <div className="animate-in slide-in-from-right duration-500 pb-32">
                <TopAppBar title="Details" showBack={true} />

                <div className="px-4">
                    <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100 mb-6">
                        <div className="h-72 bg-gray-50 rounded-3xl flex items-center justify-center p-8 relative overflow-hidden group">
                            {/* Previous Image */}
                            <button
                                onClick={() => setImgIndex(prev => (prev > 0 ? prev - 1 : selectedProduct.images.length - 1))}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-md z-10 active:scale-90 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <img
                                key={imgIndex}
                                src={selectedProduct.images[imgIndex]}
                                className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in-95 duration-500"
                                alt={selectedProduct.name}
                            />

                            {/* Next Image */}
                            <button
                                onClick={() => setImgIndex(prev => (prev < selectedProduct.images.length - 1 ? prev + 1 : 0))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-md z-10 active:scale-90 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 flex gap-2">
                                {selectedProduct.images.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setImgIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${imgIndex === i ? 'w-8 bg-ev-primary' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 mt-4 px-2 overflow-x-auto hide-scrollbar">
                            {selectedProduct.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setImgIndex(i)}
                                    className={`w-16 h-16 rounded-xl border-2 transition-all p-1 bg-gray-50 flex-shrink-0 cursor-pointer ${imgIndex === i ? 'border-ev-primary bg-ev-primary/5 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[10px] font-bold text-ev-primary uppercase tracking-widest bg-ev-secondary/20 px-3 py-1.5 rounded-xl">
                                    {selectedProduct.category}
                                </span>
                                <h1 className="text-2xl font-black text-primary mt-3 tracking-tight">{selectedProduct.name}</h1>
                            </div>
                            <div className="bg-accent/10 px-4 py-3 rounded-2xl text-right">
                                <p className="text-xl font-black text-ev-primary">{selectedProduct.price.toLocaleString()} <span className="text-xs">MMK</span></p>
                                <p className={`text-[10px] font-bold uppercase mt-1 ${selectedProduct.quantityNum < 5 ? 'text-status-danger' : 'text-status-success'}`}>{selectedProduct.stock}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-4 border-y border-gray-100 mb-6">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl">
                                <Star size={16} className="fill-accent text-accent" />
                                <span className="font-black text-primary text-sm">{selectedProduct.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{selectedProduct.reviews} customer reviews</span>
                        </div>

                        <section className="mb-6">
                            <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Product Overview</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{selectedProduct.desc}</p>
                        </section>

                        <section className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 opacity-50">Key Points</h3>
                                <ul className="space-y-2">
                                    {selectedProduct.features.map(f => (
                                        <li key={f} className="text-[11px] text-gray-600 font-bold flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-ev-primary rounded-full" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 opacity-50">Support</h3>
                                <div className="w-10 h-10 bg-status-info/10 text-status-info rounded-full flex items-center justify-center mb-2">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-[10px] font-bold text-gray-500">{selectedProduct.compatibility}</p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sticky Buy Bar (Smallest Version) */}
                <div className="fixed bottom-[105px] w-full max-w-md left-1/2 -translate-x-1/2 bg-secondary border-t border-gray-100 pt-3 pb-4 px-4 flex items-center justify-between gap-3 z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] rounded-t-[2.5rem]">
                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary active:scale-90 border border-gray-100 hover:bg-gray-50 transition-all font-bold"
                        >
                            <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="font-black text-primary w-4 text-center text-sm">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-accent shadow-sm flex items-center justify-center text-primary active:scale-90 transition-all font-bold"
                        >
                            <Plus size={12} strokeWidth={3} />
                        </button>
                    </div>
                    <button
                        onClick={() => setView('confirm')}
                        className="flex-1 bg-ev-primary text-secondary py-3 rounded-xl font-black shadow-lg shadow-ev-primary/20 flex flex-col items-center justify-center leading-none active:scale-[0.98] transition-all"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Add to Cart</span>
                        <span className="text-sm">{(selectedProduct.price * quantity).toLocaleString()} MMK</span>
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
                <div className="absolute inset-0 max-w-md left-1/2 -translate-x-1/2 bg-primary/40 backdrop-blur-sm transition-all duration-500" onClick={() => setView('detail')} />
                <div className="relative w-full max-w-md bg-secondary rounded-t-[3rem] shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-hidden border-t-2 border-white/50 max-h-[90vh] overflow-y-auto">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto my-5" />

                    <div className="px-8 pb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-primary tracking-tight">Shopping Cart</h2>
                            <button onClick={() => setView('detail')} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100"><X size={20} /></button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-5 p-5 bg-background-soft rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute inset-y-0 right-0 w-1 bg-ev-primary opacity-20" />
                                <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-inner">
                                    <img src={selectedProduct.images[0]} className="w-full h-full object-contain p-2" alt={selectedProduct.name} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-black text-primary text-lg truncate leading-tight uppercase tracking-tight">{selectedProduct.name}</p>
                                    <p className="text-xs text-gray-400 font-bold mt-1">Qty: {quantity} • MMK {selectedProduct.price.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-inner space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest">Merchant</span>
                                    <span className="font-black text-primary">Go Pay Smart Partner</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest">Balance</span>
                                    <div className="flex items-center gap-2 font-black text-ev-primary">
                                        <Wallet size={16} /> MMK {walletBalance.toLocaleString()}
                                    </div>
                                </div>

                                {/* Note Section */}
                                <div className="pt-4 border-t border-gray-50">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Order Note</label>
                                    <textarea
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="Add any specific requirements..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-ev-primary/20 transition-all resize-none h-24"
                                    />
                                </div>

                                <div className="h-px bg-gray-50 flex-1 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="text-3xl font-black text-primary">{total.toLocaleString()} <span className="text-xs">MMK</span></span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmPayment}
                                className="w-full bg-ev-primary text-secondary py-5 rounded-[2rem] font-black shadow-xl shadow-ev-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all border-b-4 border-black/10"
                            >
                                <ShieldCheck size={22} strokeWidth={3} />
                                Pay Now
                            </button>

                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-40">
                                Secure Checkout by KBZPay
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
            <div className="fixed inset-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-secondary z-[200] flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="relative group">
                    <div className="w-32 h-32 border-4 border-gray-50 rounded-full shadow-inner" />
                    <Loader2 className="absolute top-0 w-32 h-32 text-ev-primary animate-spin" strokeWidth={3} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CreditCard size={32} className="text-gray-200" />
                    </div>
                </div>
                <h2 className="text-2xl font-black text-primary mt-10 tracking-tight">Securing Payment...</h2>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-3">Connecting to Wallet</p>
            </div>
        );
    }

    // 5. SUCCESS SCREEN
    if (view === 'success') {
        const total = selectedProduct.price * quantity;
        return (
            <div className="bg-secondary min-h-screen z-[300] flex flex-col items-center pt-24 px-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-status-success rounded-[2rem] flex items-center justify-center shadow-2xl shadow-status-success/40 mb-10 rotate-12 transition-transform hover:rotate-0 duration-500">
                    <CheckCircle2 size={48} className="text-secondary" strokeWidth={3} />
                </div>

                <h2 className="text-3xl font-black text-primary mb-3 tracking-tighter text-center">PAYMENT SUCCESS!</h2>
                <p className="text-gray-400 text-center text-sm font-medium mb-12 max-w-[280px]">
                    Your order is confirmed and the transaction was secure.
                </p>

                <div className="w-full bg-white rounded-[2.5rem] p-8 space-y-5 mb-12 relative border border-gray-100 shadow-sm">
                    {/* Decorative notches */}
                    <div className="absolute top-1/2 -left-4 w-8 h-8 bg-secondary rounded-full -translate-y-1/2 shadow-inner" />
                    <div className="absolute top-1/2 -right-4 w-8 h-8 bg-secondary rounded-full -translate-y-1/2 shadow-inner" />
                    <div className="absolute left-1/4 right-1/4 top-1/2 h-[2px] bg-gray-50 border-b border-dashed border-gray-100" />

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">TX ID</span>
                        <span className="text-primary text-xs font-black uppercase tracking-tight">{transactionId}</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Amount</span>
                        <span className="text-ev-primary text-2xl font-black leading-none">{total.toLocaleString()} <span className="text-xs">MMK</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Account</span>
                        <span className="text-primary text-xs font-black uppercase tracking-tight">John Doe (KPay)</span>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <button
                        onClick={() => setView('receipt')}
                        className="w-full bg-primary text-secondary py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                    >
                        View Receipt <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className="w-full text-ev-primary font-black text-xs uppercase tracking-widest py-3 active:opacity-50 transition-opacity"
                    >
                        Back to Explore
                    </button>
                </div>
            </div>
        );
    }

    // 6. DIGITAL RECEIPT (Modified to match Go Pay aesthetics)
    if (view === 'receipt') {
        const total = selectedProduct.price * quantity;
        return (
            <div className="bg-background-soft min-h-screen animate-in slide-in-from-bottom duration-500 flex flex-col">
                <TopAppBar title="Digital Receipt" showBack={true} onBack={() => setView('success')} />

                <div className="px-4 pb-12 flex-1">
                    <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden relative border border-gray-100">
                        <div className="h-3 bg-ev-primary w-full" />

                        <div className="p-10">
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-20 h-20 bg-ev-primary/5 text-ev-primary rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner border border-ev-primary/10">
                                    <ShieldCheck size={40} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black text-primary tracking-tighter">ORDER COMPLETE</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2 opacity-60">Verified by Go Pay</p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex justify-between items-start pb-8 border-b border-dashed border-gray-200">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden p-2 flex-shrink-0 border border-gray-100 shadow-inner">
                                            <img src={selectedProduct.images[0]} className="w-full h-full object-contain" alt={selectedProduct.name} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-lg font-black text-primary tracking-tight leading-tight uppercase">{selectedProduct.name}</p>
                                            <p className="text-xs text-gray-400 font-bold mt-1">QTY: {quantity} • UNIT: {selectedProduct.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {[
                                        { label: 'Platform', value: 'Go Pay Mini App' },
                                        { label: 'Timeline', value: formatTime() },
                                        { label: 'Payment', value: 'KBZPay Wallet', icon: <CreditCard size={14} className="text-status-info" /> },
                                        { label: 'Ref Num', value: transactionId, mono: true }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</span>
                                            <span className={`text-xs font-black text-primary flex items-center gap-2 ${item.mono ? 'font-mono' : ''}`}>
                                                {item.icon}{item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 shadow-inner flex justify-between items-center">
                                    <span className="text-xs font-black text-primary uppercase tracking-widest">Total MMK</span>
                                    <span className="text-2xl font-black text-ev-primary tracking-tighter">{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col items-center opacity-40">
                                <div className="w-28 h-28 bg-white p-3 rounded-2xl border-2 border-primary shadow-sm mb-4">
                                    <div className="grid grid-cols-4 gap-1 h-full w-full">
                                        {[...Array(16)].map((_, i) => <div key={i} className={`bg-primary rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`} />)}
                                    </div>
                                </div>
                                <p className="text-[9px] text-center font-bold text-gray-400 uppercase tracking-widest max-w-[180px]">
                                    Digital Signature Verified
                                </p>
                            </div>
                        </div>

                        {/* Zig Zag Bottom Simulation */}
                        <div className="flex w-full overflow-hidden h-3">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className="min-w-[20px] h-20 bg-background-soft rounded-full -mt-2 mx-[-3px] border-t border-gray-100 shadow-inner" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            className="flex-1 bg-white border-2 border-primary text-primary py-4 rounded-[2rem] font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                        >
                            <Download size={18} /> SAVE
                        </button>
                        <button
                            className="flex-1 bg-primary text-secondary py-4 rounded-[2rem] font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                            <Share2 size={18} /> SHARE
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Explore;
