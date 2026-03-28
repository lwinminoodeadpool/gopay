import { ArrowDownLeft, ArrowUpRight, Coffee, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const history = [
    { id: 1, type: "charge", title: "EV Charging - Junction City", date: "Today, 10:30 AM", amount: "-12,500 MMK", isNegative: true, icon: Zap },
    { id: 2, type: "parking", title: "Parking - Myanmar Plaza", date: "Yesterday, 4:15 PM", amount: "-4,500 MMK", isNegative: true, icon: ArrowUpRight },
    { id: 3, type: "topup", title: "Wallet Top-up", date: "Mon, 09:00 AM", amount: "+50,000 MMK", isNegative: false, icon: ArrowDownLeft },
    { id: 4, type: "cafe", title: "EV Lounge Cafe", date: "Mon, 08:45 AM", amount: "-6,200 MMK", isNegative: true, icon: Coffee },
];

const PaymentHistory = () => {
    const navigate = useNavigate();
    return (
        <section className="mb-10 px-2 overflow-hidden">
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-lg font-bold text-primary tracking-tight">Recent Activity</h2>
                <button
                    onClick={() => navigate('/activity')}
                    className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-all border-b border-blue-100 pb-0.5"
                >
                    View All
                </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 relative overflow-hidden">
                <div className="flex flex-col gap-2">
                    {history.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className={`flex justify-between items-center py-5 ${index !== history.length - 1 ? 'border-b border-slate-50' : ''} hover:bg-slate-50/50 -mx-4 px-4 rounded-2xl transition-colors group`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 shadow-sm
                    ${item.type === 'charge' ? 'bg-blue-600 text-white' :
                                            item.type === 'topup' ? 'bg-blue-50 text-blue-600' :
                                                'bg-slate-100 text-gray-400'}`
                                    }>
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary text-sm uppercase tracking-tight group-hover:text-blue-800 transition-colors">{item.title}</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    <span className={`font-bold tracking-tighter text-lg ${item.isNegative ? 'text-primary' : 'text-blue-600'}`}>
                                        {item.amount.split(' ')[0]} <span className="text-[9px] opacity-40">{item.amount.split(' ')[1]}</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PaymentHistory;
