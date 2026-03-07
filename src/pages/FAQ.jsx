import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, ChevronDown, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
    {
        question: "How do I top up my GoPay wallet?",
        answer: "You can top up your wallet directly using KBZPay. Simply go to your profile, click on the wallet balance, and follow the on-screen instructions to bridge your KBZPay funds."
    },
    {
        question: "What happens if a charger doesn't work?",
        answer: "If a charging session fails to initiate, no funds will be deducted. Please ensure the plug is securely connected and check the station's status on our map. You can report faulty equipment via the station details page."
    },
    {
        question: "Can I use GoPay at any station?",
        answer: "GoPay is compatible with all our Smart Partner network stations. Look for the GoPay logo on the charging unit or verify compatibility within the app's Explore map."
    },
    {
        question: "How are charging fees calculated?",
        answer: "Fees consist of a base connection fee plus a rate per kWh consumed. Some premium locations may also include a parking fee. All costs are shown transparently before you start your session."
    },
    {
        question: "Is my personal data secure?",
        answer: "Yes, we use bank-level encryption (AES-256) to protect your account data, vehicle information, and transaction history. We are fully compliant with regional data protection standards."
    }
];

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(0);

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
                    <h1 className="text-xl font-black text-primary tracking-tight">Help & FAQ</h1>
                </div>
            </header>

            <main className="px-6 pt-8">
                <div className="bg-ev-primary/10 rounded-[2.5rem] p-8 mb-8 flex items-center gap-6 border border-ev-primary/10">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <MessageSquare size={32} className="text-ev-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-primary">Need Help?</h2>
                        <p className="text-sm font-bold text-gray-400">Find answers to common questions about GoPay.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-ev-primary shadow-lg shadow-ev-primary/5' : 'border-gray-100 shadow-sm'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-6 flex items-center justify-between text-left"
                            >
                                <span className={`text-sm font-black transition-colors ${openIndex === index ? 'text-ev-primary' : 'text-primary'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-ev-primary text-secondary rotate-180' : 'bg-gray-50 text-gray-400'
                                    }`}>
                                    <ChevronDown size={18} />
                                </div>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                                    <div className="p-5 bg-background-soft rounded-2xl border border-gray-50">
                                        <p className="text-sm font-bold text-gray-500 leading-relaxed italic">
                                            "{faq.answer}"
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-primary text-secondary rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-lg font-black mb-2 relative z-10">Still have questions?</h3>
                    <p className="text-xs text-white/60 font-medium mb-6 relative z-10">Our support team is available 24/7 to assist you.</p>
                    <button className="bg-ev-primary text-secondary px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-ev-primary/20 relative z-10 active:scale-95 transition-all">
                        Contact Support
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FAQ;
