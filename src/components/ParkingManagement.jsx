import { Car, Clock, MapPin, Zap } from 'lucide-react';

const ParkingManagement = () => {
    return (
        <section className="mb-8">
            <div className="flexjustify-between items-end mb-4 flex">
                <div>
                    <h2 className="text-xl font-bold text-primary">Active Parking</h2>
                    <p className="text-sm text-gray-500">Lot A - Level 2, Spot 42</p>
                </div>
                <div className="bg-status-success/10 text-status-success px-3 py-1 rounded-full text-xs font-bold">
                    Ongoing
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-gray-800 rounded-3xl p-6 text-secondary shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-ev-primary/20 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center relative z-10 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 text-accent rounded-xl backdrop-blur-sm">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-secondary/70">Elapsed Time</p>
                            <p className="text-2xl font-black font-mono">01:24:05</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-secondary/70">Current Fee</p>
                        <p className="text-xl font-bold text-accent">4,500 MMK</p>
                    </div>
                </div>

                <div className="flex justify-between items-center relative z-10 mt-6 pt-6 border-t border-white/10">
                    <button className="bg-status-danger text-white py-3 w-full rounded-2xl font-bold shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                        <Car size={18} />
                        End Session
                    </button>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
                <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-1">Go Pay Available Parking</h3>
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-ev-primary/10 p-2 rounded-lg text-ev-primary">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-primary">Downtown Plaza</p>
                            <p className="text-xs text-gray-500">0.2 mi away</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {/* Status indicators */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-status-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-[10px] font-bold text-gray-500">12</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-status-warning shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                            <span className="text-[10px] font-bold text-gray-500">5</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-status-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                            <span className="text-[10px] font-bold text-gray-500">40</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParkingManagement;
