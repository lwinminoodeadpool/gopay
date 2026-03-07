import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Share2, ReceiptText, ChevronRight } from 'lucide-react';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalCost } = location.state || { totalCost: 0 };

    // Mock transaction data
    const transactionId = "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const date = new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="animate-in zoom-in-95 fade-in duration-500 min-h-screen bg-white flex flex-col pt-20 px-6">
            <main className="flex-1 flex flex-col items-center">
                {/* Success Animation Area */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-status-success/20 rounded-full animate-ping scale-150 opacity-20"></div>
                    <div className="w-24 h-24 bg-status-success rounded-full flex items-center justify-center text-white relative z-10 shadow-lg shadow-status-success/30">
                        <CheckCircle2 size={48} strokeWidth={3} />
                    </div>
                </div>

                <div className="text-center space-y-2 mb-10">
                    <h1 className="text-2xl font-black text-primary">Payment Successful!</h1>
                    <p className="text-gray-500 font-medium">Your charging session has been paid.</p>
                </div>

                {/* Amount Paid Display */}
                <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-6 group hover:border-ev-primary/30 transition-colors">
                    <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Amount Paid</p>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-primary">{totalCost.toLocaleString()}</span>
                        <span className="text-lg font-bold text-ev-primary">MMK</span>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="w-full space-y-4 px-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-medium flex items-center gap-2">
                            <ReceiptText size={16} />
                            Transaction ID
                        </span>
                        <span className="text-primary font-bold font-mono text-xs">{transactionId}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-medium">Date & Time</span>
                        <span className="text-primary font-bold">{date}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-medium">Payment Method</span>
                        <span className="text-[#0052CC] font-bold">KBZPay</span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4">
                        <button
                            onClick={() => navigate('/receipt', { state: { totalCost, transactionId, date, energy: location.state?.energy || 0, station: location.state?.station || { name: 'Unknown Station' } } })}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl text-primary font-bold text-sm hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-2">
                                <Share2 size={16} className="text-ev-primary" />
                                View Receipt
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer Action */}
            <div className="pb-10 space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="w-full py-5 rounded-3xl font-black bg-ev-primary text-secondary hover:bg-teal-700 transition-all shadow-xl shadow-ev-primary/20 flex items-center justify-center gap-2 active:scale-95"
                >
                    <Home size={20} />
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
