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
        <div className="min-h-screen bg-background-soft pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-xl font-black text-primary tracking-tight">Full Activity</h1>
                    </div>

                    <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                            LIST
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                            TABLE
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary focus:border-ev-primary focus:bg-white outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilterDrawer(true)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all active:scale-95 ${timeRange !== 'all' || selectedTypes.length < 4 || startDate ? 'bg-ev-primary text-secondary border-ev-primary shadow-lg shadow-ev-primary/20' : 'bg-white text-primary border-gray-100'
                            }`}
                    >
                        <ListFilter size={20} />
                    </button>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${activeFilter === cat.id
                                ? 'bg-ev-primary text-secondary border-ev-primary shadow-lg shadow-ev-primary/20 scale-105'
                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
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
                                        className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center animate-in slide-in-from-bottom-2 duration-300"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                                                ${item.type === 'charge' ? 'bg-ev-primary/10 text-ev-primary' :
                                                    item.type === 'topup' ? 'bg-status-success/10 text-status-success' :
                                                        item.type === 'parking' ? 'bg-ev-secondary/10 text-ev-secondary' :
                                                            'bg-gray-100 text-gray-600'}`
                                            }>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-primary text-sm line-clamp-1">{item.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar size={12} className="text-gray-300" />
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.date} • {item.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 ml-2">
                                            <span className={`font-black tracking-tight text-lg ${item.isNegative ? 'text-primary' : 'text-status-success'}`}>
                                                {item.amount}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm animate-in fade-in duration-500">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Type</th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Time</th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredHistory.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                                                ${item.type === 'charge' ? 'bg-ev-primary/10 text-ev-primary' :
                                                                    item.type === 'topup' ? 'bg-status-success/10 text-status-success' :
                                                                        'bg-gray-100 text-gray-500'}`
                                                            }>
                                                                <item.icon size={14} />
                                                            </div>
                                                            <span className="text-xs font-black text-primary capitalize">{item.type}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-xs font-bold text-gray-500">{item.date}</td>
                                                    <td className="px-4 py-4 text-xs font-bold text-gray-400">{item.time}</td>
                                                    <td className={`px-4 py-4 text-xs font-black text-right ${item.isNegative ? 'text-primary' : 'text-status-success'}`}>
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
                    <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowFilterDrawer(false)} />
                    <div className="relative w-full max-w-md bg-secondary rounded-t-[3rem] shadow-2xl animate-in slide-in-from-bottom duration-500 p-8 pt-4">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-primary">Advanced Filter</h2>
                            <button onClick={() => setShowFilterDrawer(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Category Selection */}
                        <div className="mb-8">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Transaction Types</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'charge', label: 'Charging' },
                                    { id: 'parking', label: 'Parking' },
                                    { id: 'topup', label: 'Top-up' },
                                    { id: 'cafe', label: 'Cafe' }
                                ].map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleType(type.id)}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedTypes.includes(type.id)
                                            ? 'bg-ev-primary/5 border-ev-primary text-primary'
                                            : 'bg-white border-gray-100 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-sm font-bold">{type.label}</span>
                                        {selectedTypes.includes(type.id) && <Check size={16} className="text-ev-primary" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Period selection */}
                        <div className="mb-8">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Time Period</p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary px-1">START DATE</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-bold text-primary outline-none focus:border-ev-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary px-1">END DATE</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-bold text-primary outline-none focus:border-ev-primary transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
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
                                        className={`px-6 py-3 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${timeRange === range.id && !startDate
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-gray-50 text-gray-400 border-gray-100'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setSelectedTypes(['charge', 'parking', 'topup', 'cafe']);
                                    setTimeRange('all');
                                    setStartDate('');
                                    setEndDate('');
                                }}
                                className="flex-1 bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-sm active:scale-95 transition-all"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilterDrawer(false)}
                                className="flex-[2] bg-ev-primary text-secondary py-4 rounded-2xl font-black text-sm shadow-lg shadow-ev-primary/20 active:scale-95 transition-all"
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
