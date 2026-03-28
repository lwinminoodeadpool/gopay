import React, { useState } from 'react';
import { ChevronLeft, Zap, ArrowUpRight, ArrowDownLeft, Coffee, Search, Calendar, Filter as ListFilter, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_HISTORY = [
    { id: 1, type: "charge", title: "EV Charging - Junction City", date: "Mar 08, 2026", time: "10:30 AM", amount: "-12,500 MMK", isNegative: true, icon: Zap },
    { id: 2, type: "parking", title: "Parking - Myanmar Plaza", date: "Mar 07, 2026", time: "04:15 PM", amount: "-4,500 MMK", isNegative: true, icon: ArrowUpRight },
    { id: 3, type: "topup", title: "Wallet Top-up", date: "Mar 06, 2026", time: "09:00 AM", amount: "+50,000 MMK", isNegative: false, icon: ArrowDownLeft },
    { id: 4, type: "cafe", title: "EV Lounge Cafe", date: "Mar 06, 2026", time: "08:45 AM", amount: "-6,200 MMK", isNegative: true, icon: Coffee },
    { id: 5, type: "charge", title: "EV Charging - City Mart", date: "Mar 05, 2026", time: "02:00 PM", amount: "-8,500 MMK", isNegative: true, icon: Zap },
    { id: 6, type: "parking", title: "Parking - Sule Square", date: "Mar 04, 2026", time: "11:15 AM", amount: "-2,000 MMK", isNegative: true, icon: ArrowUpRight },
    { id: 7, type: "topup", title: "Wallet Top-up", date: "Mar 03, 2026", time: "10:00 AM", amount: "+100,000 MMK", isNegative: false, icon: ArrowDownLeft },
    { id: 8, type: "charge", title: "EV Charging - Junction City", date: "Mar 02, 2026", time: "01:30 PM", amount: "-15,000 MMK", isNegative: true, icon: Zap },
    { id: 9, type: "cafe", title: "EV Lounge Cafe", date: "Mar 01, 2026", time: "09:45 AM", amount: "-4,500 MMK", isNegative: true, icon: Coffee },
    { id: 10, type: "parking", title: "Parking - Myanmar Plaza", date: "Feb 28, 2026", time: "05:00 PM", amount: "-3,500 MMK", isNegative: true, icon: ArrowUpRight },
];

const ActivityPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState(['charge', 'parking', 'topup', 'cafe']);
    const [timeRange, setTimeRange] = useState('all');
    const [viewMode, setViewMode] = useState('table'); // 'list' or 'table'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'charge', label: 'Charging' },
        { id: 'parking', label: 'Parking' },
        { id: 'topup', label: 'Top-up' },
        { id: 'cafe', label: 'Cafe' }
    ];

    const toggleType = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const filteredHistory = ALL_HISTORY.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = activeFilter === 'all' ? selectedTypes.includes(item.type) : item.type === activeFilter;

        let matchesTime = true;
        if (startDate && endDate) {
            const itemD = new Date(item.date);
            const startD = new Date(startDate);
            const endD = new Date(endDate);
            endD.setHours(23, 59, 59, 999);
            matchesTime = itemD >= startD && itemD <= endD;
        } else if (timeRange === 'today') {
            matchesTime = item.date.includes('Mar 08');
        } else if (timeRange === 'yesterday') {
            matchesTime = item.date.includes('Mar 07');
        } else if (timeRange === 'week') {
            // Mock logic for "Mon", "Tue" etc. - for a real app, this would involve calculating the current week
            // For this example, we'll just check if it's in March 2026 as per the dummy data
            const itemDate = new Date(item.date);
            matchesTime = itemDate.getFullYear() === 2026 && itemDate.getMonth() === 2; // March is month 2 (0-indexed)
        }

        return matchesSearch && matchesType && matchesTime;
    });

    return (
        <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-primary hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-primary tracking-tight">Full Activity</h1>
                    </div>

                    <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
                        >
                            LIST
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
                        >
                            TABLE
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-50 rounded-[20px] py-4.5 pl-12 pr-4 text-sm font-bold text-primary focus:border-blue-100 focus:bg-white focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilterDrawer(true)}
                        className={`w-14 h-14 rounded-[20px] flex items-center justify-center border transition-all active:scale-95 ${timeRange !== 'all' || selectedTypes.length < 4 || startDate ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-primary border-slate-100 hover:bg-slate-50'
                            }`}
                    >
                        <ListFilter size={20} />
                    </button>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`px-6 py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${activeFilter === cat.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105'
                                : 'bg-white text-gray-400 border-slate-100 hover:border-blue-100 hover:text-blue-600'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-4 pt-6">
                <div className="space-y-4">
                    {filteredHistory.length > 0 ? (
                        viewMode === 'list' ? (
                            filteredHistory.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex justify-between items-center animate-in slide-in-from-bottom-2 duration-500 hover:shadow-[0_15px_40px_rgba(0,84,166,0.06)] hover:border-blue-50 transition-all transition-transform active:scale-[0.98]"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-sm
                                                ${item.type === 'charge' ? 'bg-blue-600 text-white shadow-blue-100' :
                                                    item.type === 'topup' ? 'bg-blue-50 text-blue-600' :
                                                        item.type === 'parking' ? 'bg-slate-900 text-white' :
                                                            'bg-slate-50 text-gray-500'}`
                                            }>
                                                <Icon size={26} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-primary text-base line-clamp-1 uppercase tracking-tight">{item.title}</h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.date}</span>
                                                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 ml-4">
                                            <span className={`font-bold tracking-tighter text-xl ${item.isNegative ? 'text-primary' : 'text-blue-600'}`}>
                                                {item.amount.split(' ')[0]} <span className="text-[10px] opacity-40">{item.amount.split(' ')[1]}</span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white rounded-[32px] border border-slate-50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in duration-700">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-slate-100">Type</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {filteredHistory.map((item) => (
                                                <tr key={item.id} className="hover:bg-blue-50/20 transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110
                                                                ${item.type === 'charge' ? 'bg-blue-600 text-white' :
                                                                    item.type === 'topup' ? 'bg-blue-50 text-blue-600' :
                                                                        'bg-slate-100 text-slate-400'}`
                                                            }>
                                                                <item.icon size={16} />
                                                            </div>
                                                            <span className="text-xs font-bold text-primary capitalize tracking-tight">{item.type}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-primary">{item.date}</span>
                                                            <span className="text-[10px] font-bold text-gray-300 uppercase mt-0.5">{item.time}</span>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-5 text-sm font-bold text-right ${item.isNegative ? 'text-primary' : 'text-blue-600'}`}>
                                                        {item.amount}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <Search size={32} className="text-gray-200" />
                            </div>
                            <p className="text-sm font-bold text-gray-400">No transactions found</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Filter Drawer */}
            {showFilterDrawer && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 max-w-md left-1/2 -translate-x-1/2 bg-blue-900/40 backdrop-blur-md" onClick={() => setShowFilterDrawer(false)} />
                    <div className="relative w-full max-w-md bg-white rounded-t-[48px] shadow-2xl animate-in slide-in-from-bottom duration-700 p-10 pt-4 border-t border-white/50">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-primary tracking-tight">Filters</h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Refine your history</p>
                            </div>
                            <button onClick={() => setShowFilterDrawer(false)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 border border-slate-100 hover:text-primary transition-all active:scale-90">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Category Selection */}
                        <div className="mb-10">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Transaction Types</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'charge', label: 'Charging' },
                                    { id: 'parking', label: 'Parking' },
                                    { id: 'topup', label: 'Top-up' },
                                    { id: 'cafe', label: 'Cafe' }
                                ].map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleType(type.id)}
                                        className={`flex items-center justify-between p-5 rounded-[24px] border-2 transition-all ${selectedTypes.includes(type.id)
                                            ? 'bg-blue-50/50 border-blue-600 text-blue-600'
                                            : 'bg-white border-slate-50 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-xs font-bold uppercase tracking-tight">{type.label}</span>
                                        {selectedTypes.includes(type.id) && <Check size={18} className="stroke-[3px]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Period selection */}
                        <div className="mb-10">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Time Period</p>
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block text-left">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs font-bold text-primary outline-none focus:border-blue-200 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block text-left">End Date</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs font-bold text-primary outline-none focus:border-blue-200 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                {[
                                    { id: 'all', label: 'All Time' },
                                    { id: 'today', label: 'Today' },
                                    { id: 'yesterday', label: 'Yesterday' }
                                ].map(range => (
                                    <button
                                        key={range.id}
                                        onClick={() => {
                                            setTimeRange(range.id);
                                            setStartDate('');
                                            setEndDate('');
                                        }}
                                        className={`px-8 py-4 rounded-[20px] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border-2 ${timeRange === range.id && !startDate
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                                            : 'bg-slate-50 text-gray-400 border-slate-50'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setSelectedTypes(['charge', 'parking', 'topup', 'cafe']);
                                    setTimeRange('all');
                                    setStartDate('');
                                    setEndDate('');
                                }}
                                className="flex-1 bg-slate-50 text-gray-400 py-6 rounded-[32px] font-bold text-xs uppercase tracking-widest active:scale-95 transition-all border border-slate-100"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilterDrawer(false)}
                                className="flex-[2] bg-blue-600 text-white py-6 rounded-[32px] font-bold text-xs uppercase tracking-widest shadow-2xl shadow-blue-200 active:scale-95 transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityPage;
