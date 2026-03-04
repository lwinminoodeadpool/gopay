import { useState } from 'react';
import { ArrowLeft, Car, Clock, CreditCard, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParkingPage = () => {
    const navigate = useNavigate();
    const [plateNumber, setPlateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [parkingData, setParkingData] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

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
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="flex items-center p-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 h-16 shadow-sm">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-700 absolute left-4 z-20"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="w-full flex justify-center absolute left-0 right-0 z-10">
                    <h1 className="text-lg font-black text-slate-800 tracking-tight">Smart Parking checkout</h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-6 max-w-md w-full mx-auto relative">

                {/* Decorative Elements for premium feel */}
                <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse transition-all duration-1000"></div>
                <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse animation-delay-2000 transition-all duration-1000"></div>

                <div className="mb-8 mt-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-blue-500/10 mb-4 border border-white/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Car className="text-blue-600 relative z-10" size={32} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Check Your Parking</h2>
                    <p className="text-slate-500 text-sm px-4 leading-relaxed">Enter your license plate number to view your current status and fee.</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white mb-6 relative z-10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. 1P-3579"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-center text-2xl font-black text-slate-800 tracking-widest uppercase transition-all shadow-inner focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-blue-500/10 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-300 placeholder:font-medium placeholder:tracking-normal"
                        />
                        <button
                            onClick={checkStatus}
                            disabled={loading || !plateNumber}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl px-4 transition-all duration-200 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-blue-500/30"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Search size={20} />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-red-100">
                            <AlertCircle size={18} className="shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Status Cards */}
                {parkingData && !paymentSuccess && (
                    <div className="animate-in slide-in-from-bottom-6 fade-in duration-500 flex-1 flex flex-col relative z-10 mt-2">
                        <div className="bg-white rounded-[2rem] p-6 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden flex-1 flex flex-col">
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 ${parkingData.status === 'ENTERED' ? 'bg-amber-500' : 'bg-ev-primary'}`}></div>

                            <div className="flex justify-between items-start mb-8 mt-2">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${parkingData.status === 'ENTERED' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse' : 'bg-ev-primary shadow-[0_0_8px_rgba(13,148,136,0.6)]'}`}></div>
                                        <h3 className={`text-xl font-black ${parkingData.status === 'ENTERED' ? 'text-amber-600' : 'text-ev-primary'}`}>
                                            {parkingData.status === 'ENTERED' ? 'Currently Parked' : 'Checked Out'}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm inline-flex items-center justify-center">
                                    <p className="font-black text-slate-800 font-mono text-lg tracking-wider">{parkingData.plateNumber}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex bg-slate-50/80 rounded-2xl p-4 items-center gap-5 border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${parkingData.status === 'ENTERED' ? 'bg-amber-100 text-amber-600' : 'bg-ev-primary/10 text-ev-primary'}`}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 mb-0.5">Total Duration</p>
                                        <p className="text-2xl font-black text-slate-800 tracking-tight">
                                            {parkingData.status === 'ENTERED' ? parkingData.currentDurationMinutes : (parkingData.durationMinutes || parkingData.duration)} <span className="text-base font-bold text-slate-400 ml-1">mins</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex bg-slate-50/80 rounded-2xl p-4 items-center gap-5 border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-ev-primary/10 flex items-center justify-center text-ev-primary shrink-0">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 mb-0.5">Total Fee</p>
                                        <p className="text-3xl font-black text-slate-800 tracking-tight">
                                            {parkingData.status === 'ENTERED' ? parkingData.currentPrice : parkingData.price} <span className="text-base font-bold text-slate-400 ml-1">KS</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {parkingData.status === 'ENTERED' ? (
                                <div className="bg-amber-50/80 rounded-2xl p-5 text-center border border-amber-100 mt-auto">
                                    <p className="text-amber-800 text-sm font-semibold leading-relaxed">
                                        You are currently parked. Scan your car at the exit gate to finish your session and pay.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="w-full bg-ev-primary hover:bg-teal-700 active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-lg shadow-ev-primary/30 transition-all duration-200 flex items-center justify-center gap-2 mt-auto text-lg overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                                    ) : (
                                        <span className="relative z-10 flex items-center gap-2">
                                            Pay Now <span className="opacity-70 text-sm">{parkingData.price} KS</span>
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Success State */}
                {paymentSuccess && !loading && (
                    <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 flex-1 flex flex-col justify-center items-center text-center p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 border border-emerald-100 mb-6 mt-4 relative overflow-hidden z-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-ev-primary/20 rounded-full mix-blend-multiply blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-ev-primary/20 rounded-full mix-blend-multiply blur-3xl -z-10"></div>

                        <div className="w-24 h-24 bg-gradient-to-br from-ev-primary/20 to-ev-primary/5 rounded-full flex items-center justify-center text-ev-primary mb-8 shadow-inner border border-ev-primary/20 relative">
                            <div className="absolute inset-0 rounded-full animate-ping bg-ev-primary/20"></div>
                            <CheckCircle2 size={48} className="relative z-10 drop-shadow-sm" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Payment Successful!</h2>
                        <p className="text-slate-500 mb-10 leading-relaxed font-medium">Your parking session has been finalized. Thank you for using Smart Parking!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-slate-800 hover:bg-slate-900 active:scale-[0.98] text-white font-black py-4 px-8 rounded-2xl w-full shadow-lg shadow-slate-800/20 transition-all duration-200"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ParkingPage;
