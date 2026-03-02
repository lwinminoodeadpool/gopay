import { useState, useEffect } from 'react';
import { Clock, Car, MapPin } from 'lucide-react';

const ActiveSession = ({ details, onEndSession }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    // Mock timer ticking
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format seconds to HH:MM:SS
    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-black text-primary">Active Parking</h2>
                    <p className="text-sm font-medium text-gray-500">Lot B - Level 1, Spot 12</p>
                </div>
                <div className="bg-ev-primary/10 text-ev-primary px-3 py-1 rounded-full text-xs font-bold border border-ev-primary/20 shadow-sm shadow-ev-primary/10">
                    In Progress
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6 border border-blue-500/50">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center relative z-10 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 text-white rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-white/70 font-medium tracking-wide uppercase">Elapsed Time</p>
                            <p className="text-3xl font-black font-mono tracking-wider tabular-nums">{formatTime(elapsedTime)}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10 mb-8">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-xs text-white/70 mb-1">Plate Number</p>
                        <p className="font-mono font-bold">{details.carNumber}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-xs text-white/70 mb-1">Current Fee</p>
                        <p className="font-bold text-lg">{details.fee?.toLocaleString()} MMK</p>
                    </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/20">
                    <button
                        onClick={onEndSession}
                        className="bg-status-danger text-white py-4 w-full rounded-2xl font-black shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Car size={20} />
                        End Session
                    </button>
                    <p className="text-center text-[10px] text-white/50 mt-3">Charges apply immediately upon ending</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex flex-col items-center justify-center text-blue-600">
                    <MapPin size={24} />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-primary">Downtown Plaza</p>
                    <p className="text-xs text-gray-500">Get Directions to your car</p>
                </div>
            </div>
        </div>
    );
};

export default ActiveSession;
