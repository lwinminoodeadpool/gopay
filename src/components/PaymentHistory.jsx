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
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-primary">Recent Activity</h2>
                <button
                    onClick={() => navigate('/activity')}
                    className="text-sm font-bold text-gray-400 hover:text-ev-primary transition-colors pr-2 active:scale-95"
                >
                    See All
                </button>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex flex-col">
                    {history.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className={`flex justify-between items-center py-4 ${index !== history.length - 1 ? 'border-b border-gray-50' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                    ${item.type === 'charge' ? 'bg-ev-primary/10 text-ev-primary' :
                                            item.type === 'topup' ? 'bg-status-success/10 text-status-success' :
                                                'bg-gray-100 text-gray-600'}`
                                    }>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary text-sm line-clamp-1">{item.title}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 ml-2">
                                    <span className={`font-black tracking-tight ${item.isNegative ? 'text-primary' : 'text-status-success'}`}>
                                        {item.amount}
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
