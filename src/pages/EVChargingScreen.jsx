import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BatteryCharging, MapPin, Zap, ArrowLeft, Clock, Activity, CreditCard, Navigation, Star } from 'lucide-react';

const yangonStations = [
    { id: 1, name: "Junction City EV", location: "Downtown Yangon", distance: "0.5 km", available: 2, total: 4, power: "150kW", fast: true, rating: 4.8 },
    { id: 2, name: "Myanmar Plaza", location: "Bahan Township", distance: "1.2 km", available: 0, total: 6, power: "50kW", fast: false, rating: 4.5 },
    { id: 3, name: "Times City", location: "Kamayut Township", distance: "2.5 km", available: 5, total: 8, power: "250kW", fast: true, rating: 4.9 },
    { id: 4, name: "Lotte Hotel", location: "Hlaing Township", distance: "4.1 km", available: 1, total: 2, power: "120kW", fast: true, rating: 4.7 },
    { id: 5, name: "City Mall St. John", location: "Lanmadaw Township", distance: "5.3 km", available: 3, total: 4, power: "60kW", fast: false, rating: 4.3 },
];

const EVChargingScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data for the selected station
    const station = {
        name: id === '1' ? 'Junction City EV' : id === '2' ? 'Myanmar Plaza' : 'Times City',
        location: 'Yangon, Myanmar',
        type: id === '2' ? 'AC Charger' : 'DC Fast Charger',
        power: id === '1' ? '150kW' : id === '2' ? '50kW' : '250kW',
        available: true,
        pricePerKwh: 350, // in MMK
    };

    // State
    const [isCharging, setIsCharging] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [energy, setEnergy] = useState(0.00); // kWh
    const [totalCost, setTotalCost] = useState(0);
    const [percentage, setPercentage] = useState(24); // Starting percentage

    // Timer and calculation effect
    useEffect(() => {
        let interval;
        if (isCharging) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
                // Simulate charging: e.g., 0.02 kWh per second
                setEnergy((prev) => +(prev + 0.02).toFixed(2));
                // Simulate percentage increase (slower than energy)
                setPercentage((prev) => prev < 100 ? prev + 0.1 : 100);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isCharging]);

    // Recalculate total cost when energy changes
    useEffect(() => {
        setTotalCost(() => Math.floor(energy * station.pricePerKwh));
    }, [energy, station.pricePerKwh]);

    // Formatting Helpers
    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleStartStop = () => {
        setIsCharging(!isCharging);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 min-h-screen bg-gray-50 flex flex-col pt-14">
            {/* Header / Top App Bar */}
            <header className="flex items-center px-4 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-gray-100 transition-colors border border-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-primary">EV Charging Session</h1>
                </div>
                <div className="w-10 h-10"></div> {/* Spacer for centering */}
            </header>

            <main className="flex-1 px-4 space-y-6">
                {/* Nearby Yangon Stations List */}
                <div className="pt-2 pb-4 border-b border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-primary">Other Stations in Yangon</h3>
                        <a
                            href="https://www.google.com/maps/search/EV+charging+station+in+Yangon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-ev-primary hover:underline"
                        >
                            View Map
                        </a>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory pt-2 pl-2 -ml-2 pr-2">
                        {yangonStations.filter(s => s.id.toString() !== id).map((station) => (
                            <div
                                key={station.id}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    navigate(`/charging/${station.id}`);
                                }}
                                className="min-w-[280px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-all snap-center group transform hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${station.fast ? 'bg-accent/10 text-accent' : 'bg-ev-secondary/10 text-ev-secondary'}`}>
                                        <Zap size={24} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-primary truncate group-hover:text-ev-primary transition-colors">{station.name}</h4>
                                        <div className="flex items-center text-xs text-gray-500 gap-2 mt-0.5">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {station.distance}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-orange-400"><Star size={12} fill="currentColor" /> {station.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                    <span className="text-xs font-bold text-primary bg-gray-50 px-2 py-1 rounded-md">{station.power}</span>
                                    <span className={`text-[10px] font-bold ${station.available > 0 ? 'text-status-success bg-status-success/10' : 'text-status-danger bg-status-danger/10'} px-2 py-1 rounded-md`}>
                                        {station.available}/{station.total} Available
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Station Info Card */}
                <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="font-black text-2xl text-primary">{station.name}</h2>
                            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                <MapPin size={16} className="text-ev-primary" />
                                <span>{station.location}</span>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${station.available ? 'bg-status-success/15 text-status-success' : 'bg-status-danger/15 text-status-danger'}`}>
                            {station.available ? 'Available' : 'Busy'}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center text-sm border border-gray-100">
                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-accent" />
                            <span className="font-semibold text-primary">{station.type}</span>
                            <span className="text-gray-400">({station.power})</span>
                        </div>
                        <div className="font-bold text-ev-primary">
                            {station.pricePerKwh} MMK<span className="text-gray-400 text-xs font-normal">/kWh</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons (Moved Above Progress) */}
                <div className="pt-2 space-y-4 flex flex-col w-full">
                    <button
                        onClick={handleStartStop}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98] ${isCharging
                            ? 'bg-status-danger text-white hover:bg-red-600 shadow-status-danger/25'
                            : 'bg-ev-primary text-secondary hover:bg-teal-700 shadow-ev-primary/25'
                            }`}
                    >
                        {isCharging ? 'Stop Charging' : 'Start Charging'}
                    </button>

                    {!isCharging && energy > 0 && (
                        <button className="w-full py-4 rounded-2xl font-bold text-lg bg-[#0052CC] text-white hover:bg-[#0047b3] transition-all shadow-lg shadow-[#0052CC]/25 flex items-center justify-center gap-2 transform active:scale-[0.98]">
                            <CreditCard size={20} />
                            Pay with KBZPay
                        </button>
                    )}
                </div>

                {/* Live Charging Data */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center relative">
                    <h3 className="text-gray-500 font-medium mb-4">Charging Progress</h3>

                    {/* Circular Progress Indicator */}
                    <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * percentage) / 100}
                                className={`transition-all duration-1000 ease-in-out ${isCharging ? 'text-ev-primary' : 'text-gray-300'}`}
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-primary">{Math.floor(percentage)}%</span>
                            <span className="text-xs text-gray-400 mt-1">{isCharging ? 'Charging...' : 'Paused'}</span>
                        </div>

                        {/* Glow effect when charging */}
                        {isCharging && (
                            <div className="absolute inset-0 rounded-full border-4 border-ev-primary/30 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <Clock className={`mb-1.5 ${isCharging ? 'text-ev-primary' : 'text-gray-400'}`} size={20} />
                            <p className="text-gray-500 text-xs font-medium mb-0.5">Time Elapsed</p>
                            <p className="text-lg font-black text-primary font-mono">{formatTime(seconds)}</p>
                        </div>

                        <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <Activity className={`mb-1.5 ${isCharging ? 'text-ev-secondary' : 'text-gray-400'}`} size={20} />
                            <p className="text-gray-500 text-xs font-medium mb-0.5">Delivered</p>
                            <p className="text-lg font-black text-primary font-mono">{energy.toFixed(2)}<span className="text-[10px] text-gray-400 ml-0.5">kWh</span></p>
                        </div>
                    </div>
                </div>

                {/* Total Cost Card */}
                <div className="bg-gradient-to-r from-primary to-gray-800 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 rounded-full bg-white/10 w-32 h-32 blur-2xl"></div>
                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <p className="text-white/70 text-sm font-medium mb-1">Current Session Total</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black">{totalCost.toLocaleString()}</span>
                                <span className="text-lg font-medium text-white/80">MMK</span>
                            </div>
                        </div>
                        <BatteryCharging size={40} className={`opacity-80 ${isCharging ? 'animate-pulse text-status-success' : 'text-white'}`} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EVChargingScreen;
