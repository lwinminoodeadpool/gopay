import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle2, QrCode, ShieldCheck, Info } from 'lucide-react';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { station, energy, totalCost } = location.state || {
        station: { name: 'Unknown Station', location: 'Unknown Location' },
        energy: 0,
        totalCost: 0
    };

    const handleConfirmPayment = () => {
        // Navigate to success screen with session data
        navigate('/payment-success', { state: { totalCost, energy, station } });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-10 min-h-screen bg-gray-50 flex flex-col pt-14 px-4">
            {/* Header */}
            <header className="flex items-center mb-8 sticky top-0 bg-gray-50 z-10 py-2">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-gray-100 transition-colors border border-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-primary">Checkout</h1>
                </div>
                <div className="w-10 h-10"></div>
            </header>

            <main className="space-y-6 flex-1">
                {/* Order Summary Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-ev-primary/10 rounded-2xl flex items-center justify-center text-ev-primary">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-primary">Charging Session</h2>
                            <p className="text-sm text-gray-500">{station.name}</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-50">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Energy Delivered</span>
                            <span className="font-bold text-primary">{energy.toFixed(2)} kWh</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Price per kWh</span>
                            <span className="font-bold text-primary">350 MMK</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                            <span className="text-lg font-bold text-primary">Total Amount</span>
                            <div className="text-right">
                                <span className="text-2xl font-black text-ev-primary">{totalCost.toLocaleString()}</span>
                                <span className="text-xs font-bold text-gray-400 ml-1">MMK</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-status-success" />
                        Secure Payment
                    </h3>

                    <div className="bg-[#0052CC]/5 border-2 border-[#0052CC] rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0052CC] rounded-xl flex items-center justify-center text-white">
                                <QrCode size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-primary">KBZPay</p>
                                <p className="text-[10px] text-gray-400 font-medium">Fast & Secure Checkout</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-4 border-[#0052CC] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#0052CC]"></div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <Info size={14} className="flex-shrink-0 mt-0.5" />
                        <p>You will be redirected to the KBZPay app to complete your transaction securely.</p>
                    </div>
                </div>
            </main>

            {/* Footer Action */}
            <div className="mt-8">
                <button
                    onClick={handleConfirmPayment}
                    className="w-full py-4 rounded-2xl font-bold text-lg bg-ev-primary text-secondary hover:bg-teal-700 transition-all shadow-lg shadow-ev-primary/25 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                >
                    <CreditCard size={20} />
                    Confirm Payment
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4">
                    Transaction processed by KBZPay Gateway • Secured by Go Pay
                </p>
            </div>
        </div>
    );
};

export default Checkout;
