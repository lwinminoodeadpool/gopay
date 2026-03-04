import { Car, Clock, MapPin, Zap } from 'lucide-react';

const ParkingManagement = () => {
    return (
        <section className="mb-8">

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
