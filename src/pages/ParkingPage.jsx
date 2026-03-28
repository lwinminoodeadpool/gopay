import { useState, useEffect } from 'react';
import { ArrowLeft, Car, Clock, CreditCard, Search, AlertCircle, CheckCircle2, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiGet, ENDPOINTS } from '../services/apiClient';


const ParkingPage = () => {
    const navigate = useNavigate();
    const [plateNumber, setPlateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [parkingData, setParkingData] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [parkingList, setParkingList] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [listError, setListError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setListLoading(true);
                setListError(null);
                const data = await apiGet(ENDPOINTS.PARKING);

                if (!cancelled) {
                    const list = data?.result?.data ?? data?.data ?? (Array.isArray(data) ? data : []);
                    setParkingList(list);
                }
            } catch (err) {
                if (!cancelled) setListError('Could not fetch available parking spots.');
            } finally {
                if (!cancelled) setListLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    const filteredParking = parkingList.filter(spot => {
        const name = spot.Bill_Payments__name__CST ?? spot.name ?? spot.parking_name ?? '';
        const address = spot.Bill_Payments__address__CST ?? spot.address ?? spot.location ?? '';
        const searchLower = searchQuery.toLowerCase();
        return name.toLowerCase().includes(searchLower) || address.toLowerCase().includes(searchLower);
    });

    const checkStatus = async () => {
        if (!plateNumber.trim()) {
            setError('Please enter a valid license plate number');
            return;
        }

        setLoading(true);
        setError('');
        setParkingData(null);
        setPaymentSuccess(false);

        try {
            const response = await fetch('https://dqpiqayw43.execute-api.eu-north-1.amazonaws.com/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plateNumber: plateNumber.toUpperCase().trim(),
                    action: 'status'
                })
            });

            if (!response.ok) {
                // Ignore general 404s if API returns them for "car not found"
                if (response.status === 404) {
                    setError('No active parking session found for this vehicle.');
                    setLoading(false);
                    return;
                }
                throw new Error('Failed to fetch parking status');
            }

            const data = await response.json();

            // Handle situations where backend returns successful status but effectively says "not found"
            if (!data.status || data.message === 'Not Found') {
                setError('No parking session found for this vehicle.');
            } else {
                setParkingData({
                    ...data,
                    plateNumber: plateNumber.toUpperCase().trim()
                });
            }
        } catch (err) {
            console.error('Error fetching parking data:', err);
            setError('Could not connect to the parking system. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = () => {
        setLoading(true);
        // Simulate payment processing since it's just a mockup payment
        setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans mb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-50 flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-primary hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-primary tracking-tight">Parking Checkout</h1>
            </header>

            <main className="flex-1 flex flex-col p-6 max-w-md w-full mx-auto relative">

                {/* Decorative Elements for premium feel */}
                <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse transition-all duration-1000"></div>
                <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse animation-delay-2000 transition-all duration-1000"></div>

                <div className="mb-10 mt-6 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-blue-50 shadow-lg shadow-blue-100 mb-6 border border-blue-100 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Car className="text-blue-600 relative z-10" size={36} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-2 tracking-tight">Check Your Parking</h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4">Instant payment & status</p>
                </div>

                <div className="bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 mb-8 relative z-10">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="e.g. 1P-3579"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] px-6 py-5 text-center text-3xl font-bold text-primary tracking-widest uppercase transition-all focus:outline-none focus:border-blue-100 focus:bg-white focus:ring-4 focus:ring-blue-50/50 placeholder:text-gray-200 placeholder:font-bold placeholder:tracking-normal placeholder:text-xs"
                        />
                        <button
                            onClick={checkStatus}
                            disabled={loading || !plateNumber}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-[20px] px-6 transition-all duration-300 disabled:opacity-30 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-200/50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Search size={22} strokeWidth={2.5} />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-5 bg-red-50 text-red-600 rounded-[20px] text-xs font-bold flex items-center gap-4 animate-in fade-in slide-in-from-top-2 border border-red-100 shadow-sm">
                            <AlertCircle size={20} className="shrink-0" />
                            <p className="tracking-tight uppercase">{error}</p>
                        </div>
                    )}
                </div>

                {/* Status Cards */}
                {parkingData && !paymentSuccess && (
                    <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 flex-1 flex flex-col relative z-10 mt-2">
                        <div className="bg-white rounded-[40px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-slate-50 relative overflow-hidden flex-1 flex flex-col">
                            {/* Status Indicator */}
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full animate-ping ${parkingData.status === 'ENTERED' ? 'bg-amber-500' : 'bg-blue-600'}`}></div>
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${parkingData.status === 'ENTERED' ? 'text-amber-600' : 'text-blue-600'}`}>
                                            {parkingData.status === 'ENTERED' ? 'In Session' : 'Completed'}
                                        </p>
                                    </div>
                                    <h3 className="text-3xl font-bold text-primary tracking-tighter">
                                        {parkingData.status === 'ENTERED' ? 'Currently Parked' : 'Visit Detail'}
                                    </h3>
                                </div>
                                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                                    <p className="font-bold text-primary font-mono text-xl tracking-[0.1em]">{parkingData.plateNumber}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                <div className="bg-slate-50/50 rounded-[28px] p-6 border border-slate-50 hover:border-blue-100 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${parkingData.status === 'ENTERED' ? 'bg-white text-amber-500' : 'bg-blue-600 text-white'}`}>
                                            <Clock size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                                            <p className="text-2xl font-bold text-primary tracking-tight">
                                                {parkingData.status === 'ENTERED' ? parkingData.currentDurationMinutes : (parkingData.durationMinutes || parkingData.duration)} <span className="text-sm text-gray-400 font-medium">mins</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 rounded-[28px] p-6 border border-slate-50 hover:border-blue-100 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100 shrink-0">
                                            <CreditCard size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Cost</p>
                                            <p className="text-2xl font-bold text-primary tracking-tight italic">
                                                {parkingData.status === 'ENTERED' ? parkingData.currentPrice : parkingData.price} <span className="text-sm font-bold text-blue-600 ml-1">KS</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {parkingData.status === 'ENTERED' ? (
                                <div className="bg-amber-50 rounded-[24px] p-6 text-center border border-amber-100 mt-auto">
                                    <p className="text-amber-800 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                                        Active session detected.<br />Pay at exit gate.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-6 rounded-[32px] shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mt-auto text-sm uppercase tracking-widest"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Pay Now <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> {parkingData.price} KS
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Success State */}
                {paymentSuccess && !loading && (
                    <div className="animate-in zoom-in-95 fade-in duration-700 flex-1 flex flex-col justify-center items-center text-center p-12 bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-50 mb-8 mt-6 relative overflow-hidden z-10">
                        <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center text-blue-600 mb-10 shadow-lg shadow-blue-50 relative">
                            <div className="absolute inset-0 rounded-[32px] animate-ping bg-blue-100 opacity-20"></div>
                            <CheckCircle2 size={48} strokeWidth={1.5} className="relative z-10" />
                        </div>
                        <h2 className="text-4xl font-bold text-primary mb-3 tracking-tighter">Payment Confirmed</h2>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">Thank you for using Go Pay</p>

                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-6 px-10 rounded-[32px] w-full shadow-2xl shadow-blue-200 transition-all text-xs uppercase tracking-widest"
                        >
                            Finish & Return
                        </button>
                    </div>
                )}

                {/* Available Parking List Section */}
                <div className="mt-16 mb-4 animate-in slide-in-from-bottom-10 fade-in duration-800 relative z-10 w-full">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">Nearby Parking</h2>
                        <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest">Live</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-10">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] py-5 pr-6 pl-14 text-primary focus:outline-none focus:border-blue-100 focus:bg-white focus:ring-8 focus:ring-blue-50/30 transition-all placeholder:text-gray-300 font-bold text-sm"
                        />
                    </div>

                    {listLoading && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-300 bg-slate-50/50 rounded-[40px] border border-slate-50">
                            <Loader2 size={40} className="animate-spin mb-4 text-blue-600/30" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Locating spots...</span>
                        </div>
                    )}

                    {listError && (
                        <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-[32px] border border-red-100 text-red-500 mb-10 text-center">
                            <AlertCircle size={32} className="mb-4 opacity-50" />
                            <span className="text-xs font-bold uppercase tracking-widest">{listError}</span>
                        </div>
                    )}

                    {!listLoading && !listError && filteredParking.length === 0 && (
                        <div className="text-center py-20 bg-slate-50/50 rounded-[40px] border border-slate-50 text-gray-300 flex flex-col items-center justify-center">
                            <Car size={48} strokeWidth={1} className="mb-6 opacity-20" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">No matches found</p>
                        </div>
                    )}

                    {!listLoading && !listError && filteredParking.length > 0 && (
                        <div className="flex flex-col gap-6 pb-20">
                            {filteredParking.map((spot, index) => {
                                const name = spot.Bill_Payments__name__CST ?? spot.name ?? spot.parking_name ?? `Spot #${index + 1}`;
                                const address = spot.Bill_Payments__address__CST ?? spot.address ?? spot.location ?? '';
                                const price = spot.Bill_Payments__price__CST ?? spot.price ?? '';

                                return (
                                    <div
                                        key={spot._id ?? spot.id ?? index}
                                        className="flex items-center justify-between bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_15px_45px_rgba(0,84,166,0.08)] hover:border-blue-100 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-6 min-w-0 pr-4">
                                            <div className="bg-blue-50 w-16 h-16 rounded-[24px] flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                                                <MapPin size={24} strokeWidth={1.5} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-primary text-lg truncate tracking-tight">{name}</p>
                                                {address && (
                                                    <p className="text-[10px] text-gray-400 truncate mt-1.5 font-bold uppercase tracking-widest">{address}</p>
                                                )}
                                            </div>
                                        </div>

                                        {price && (
                                            <div className="bg-blue-600 px-5 py-3 rounded-2xl shrink-0 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">{price} KS</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ParkingPage;
