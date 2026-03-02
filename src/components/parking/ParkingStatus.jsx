import { MapPin } from 'lucide-react';

const ParkingStatus = ({ carNumber, onNext }) => {
    // Mock data for the parking status
    const statusData = {
        location: "Downtown Plaza - Lot B",
        available: 18,
        occupied: 42,
        reserved: 5,
        total: 65,
        zones: [
            { id: 'z1', label: 'A1-A10', status: 'occupied', count: 10 },
            { id: 'z2', label: 'B1-B20', status: 'available', count: 5 },
            { id: 'z3', label: 'C1-C15', status: 'reserved', count: 5 },
        ]
    };

    return (
        <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-black text-primary mb-6">Parking Status</h2>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="bg-primary text-accent p-2 rounded-xl">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-primary">{statusData.location}</p>
                        <p className="text-xs text-gray-500 font-mono">Plate: {carNumber}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="bg-status-success rounded-3xl flex justify-between items-center p-6 shadow-[0_8px_24px_rgba(34,197,94,0.4)] border-2 border-white/80 relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                        <p className="text-sm uppercase font-black text-white/90 tracking-widest relative z-10">Available</p>
                        <p className="text-4xl font-black text-white relative z-10">{statusData.available}</p>
                    </div>
                    <div className="bg-status-danger rounded-3xl flex justify-between items-center p-6 shadow-[0_8px_24px_rgba(239,68,68,0.4)] border-2 border-white/80 relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                        <p className="text-sm uppercase font-black text-white/90 tracking-widest relative z-10">Occupied</p>
                        <p className="text-4xl font-black text-white relative z-10">{statusData.occupied}</p>
                    </div>
                    <div className="bg-status-warning rounded-3xl flex justify-between items-center p-6 shadow-[0_8px_24px_rgba(234,179,8,0.4)] border-2 border-white/80 relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                        <p className="text-sm uppercase font-black text-white/90 tracking-widest relative z-10">Reserved</p>
                        <p className="text-4xl font-black text-white relative z-10">{statusData.reserved}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-ev-primary text-white py-4 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors"
            >
                Select Parking Time
            </button>
        </div>
    );
};

export default ParkingStatus;
