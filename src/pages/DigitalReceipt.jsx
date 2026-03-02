import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle2, QrCode, Zap, Printer } from 'lucide-react';

const DigitalReceipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalCost, energy, station, transactionId, date } = location.state || {
        totalCost: 0,
        energy: 0,
        station: { name: 'Unknown Station' },
        transactionId: "TXN---",
        date: new Date().toLocaleString()
    };

    const handleDownload = () => {
        alert('Downloading receipt as PDF...');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen bg-gray-100 flex flex-col pt-14 px-4 pb-10">
            {/* Header */}
            <header className="flex items-center mb-6 sticky top-0 bg-gray-100 z-10 py-2">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-gray-100 transition-colors border border-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-primary">E-Receipt</h1>
                </div>
                <div className="w-10 h-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center">
                {/* Receipt "Paper" */}
                <div className="w-full bg-white rounded-t-3xl shadow-xl relative p-8 flex flex-col items-center">
                    {/* Brand Logo / Icon */}
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                        <Zap size={32} fill="currentColor" className="text-ev-primary" />
                    </div>
                    <h2 className="text-xl font-black text-primary">Go Pay</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Mini App Payment</p>

                    <div className="w-full space-y-4 mb-8">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400 font-medium">Status</span>
                            <span className="text-status-success font-bold flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Completed
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400 font-medium">Transaction ID</span>
                            <span className="text-primary font-bold font-mono">{transactionId}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400 font-medium">Date</span>
                            <span className="text-primary font-bold">{date}</span>
                        </div>
                    </div>

                    <div className="w-full border-t border-dashed border-gray-200 pt-6 space-y-4">
                        <div className="flex justify-between text-sm">
                            <div className="text-primary font-bold flex flex-col">
                                <span>EV Charging Session</span>
                                <span className="text-[10px] text-gray-400 font-normal">{station?.name}</span>
                            </div>
                            <span className="text-primary font-black">{energy.toFixed(2)} kWh</span>
                        </div>

                        <div className="space-y-2 pt-4">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Energy Cost (350 MMK/kWh)</span>
                                <span>{(energy * 350).toLocaleString()} MMK</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Service Fee</span>
                                <span>0 MMK</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>GST (0%)</span>
                                <span>0 MMK</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4 mt-6">
                            <span className="text-primary font-bold">Total Paid</span>
                            <div className="text-right">
                                <span className="text-xl font-black text-primary">{totalCost.toLocaleString()}</span>
                                <span className="text-xs font-bold text-gray-400 ml-1">MMK</span>
                            </div>
                        </div>
                    </div>

                    {/* Zigzag bottom effect mockup */}
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-[radial-gradient(circle_at_50%_-20%,transparent_50%,white_50%)] bg-[length:16px_16px]"></div>
                </div>

                <div className="w-full bg-white/50 backdrop-blur-sm rounded-b-3xl p-6 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-[#0052CC] mb-4">
                        <QrCode size={16} />
                        <span className="text-xs font-bold">Paid with KBZPay</span>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center px-10 italic">
                        Thank you for choosing Go Pay. Safe driving with your fully charged EV!
                    </p>
                </div>
            </main>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                    onClick={handleDownload}
                    className="py-4 bg-white rounded-2xl font-bold text-primary shadow-sm border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                    <Download size={18} />
                    Save PDF
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98]"
                >
                    Done
                </button>
            </div>

            <button className="mt-4 flex items-center justify-center gap-2 text-primary font-bold text-xs hover:underline opacity-60">
                <Printer size={14} />
                Send to Email
            </button>
        </div>
    );
};

export default DigitalReceipt;
