import React from 'react';
import { ChevronLeft, FileText, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-soft pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 border-b border-gray-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-primary tracking-tight">Terms & Conditions</h1>
                </div>
            </header>

            <main className="px-6 pt-8 space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100">
                    <div className="w-16 h-16 bg-ev-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={32} className="text-ev-primary" />
                    </div>

                    <div className="space-y-8">
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-6 h-6 bg-primary text-secondary rounded-lg flex items-center justify-center text-[10px] font-black">01</span>
                                <h2 className="text-lg font-black text-primary">Acceptance of Terms</h2>
                            </div>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed pl-8">
                                By accessing and using GoPay, you acknowledge that you have read, understood, and agreed to be bound by these terms. This includes compliance with all local regulations regarding EV charging and safety.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-6 h-6 bg-primary text-secondary rounded-lg flex items-center justify-center text-[10px] font-black">02</span>
                                <h2 className="text-lg font-black text-primary">Payment & Wallet</h2>
                            </div>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed pl-8">
                                All financial transactions are processed securely through KBZPay. Users are responsible for maintaining sufficient balance in their GoPay wallet for scheduled charging sessions.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-6 h-6 bg-primary text-secondary rounded-lg flex items-center justify-center text-[10px] font-black">03</span>
                                <h2 className="text-lg font-black text-primary">Charging Etiquette</h2>
                            </div>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed pl-8">
                                Users must vacate charging bays within 15 minutes of session completion. Overstay fees may apply to ensure fair access for all community members.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-6 h-6 bg-primary text-secondary rounded-lg flex items-center justify-center text-[10px] font-black">04</span>
                                <h2 className="text-lg font-black text-primary">Data Protection</h2>
                            </div>
                            <div className="bg-background-soft p-4 rounded-2xl border border-gray-50 ml-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck size={16} className="text-ev-primary" />
                                    <p className="text-xs font-black text-primary uppercase">Secure Storage</p>
                                </div>
                                <p className="text-xs font-bold text-gray-400 leading-relaxed">
                                    Your personal and vehicle data is encrypted using industry-standard protocols. We never sell your data to third-party advertisers.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="text-center px-8">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                        Last Updated: March 2026<br />
                        GoPay Smart Ecosystem
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditions;
