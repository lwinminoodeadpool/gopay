import { BatteryCharging, MapPin, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stations = [
    { id: 1, name: "Junction City EV", distance: "0.5 km", available: 2, total: 4, power: "150kW", fast: true },
    { id: 2, name: "Myanmar Plaza", distance: "1.2 km", available: 0, total: 6, power: "50kW", fast: false },
    { id: 3, name: "Times City", distance: "2.5 km", available: 5, total: 8, power: "250kW", fast: true },
];

const ChargingStationList = () => {
    const navigate = useNavigate();

    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-primary">Charging Stations</h2>
                <button className="text-sm font-bold text-ev-primary hover:text-ev-primary/80 transition-colors">See All</button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory pt-2 pl-2 -ml-2 pr-2">
                {stations.map((station) => (
                    <div
                        key={station.id}
                        className="min-w-[260px] bg-white rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 snap-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(13,148,136,0.15)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Top right icon */}
                        <div className="absolute top-0 right-0 p-3">
                            <div className={`p-2 rounded-bl-3xl rounded-tr-xl bg-gradient-to-br ${station.fast ? 'from-accent to-orange-400' : 'from-ev-secondary to-ev-primary'} text-white shadow-md`}>
                                <Zap size={16} fill="currentColor" />
                            </div>
                        </div>

                        <h3 className="font-bold text-lg text-primary mr-10 truncate">{station.name}</h3>

                        <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                            <MapPin size={14} className="text-ev-primary" />
                            <span>{station.distance}</span>
                        </div>

                        <div className="mt-5 flex items-end justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${station.available > 0 ? 'bg-status-success/10 text-status-success' : 'bg-status-danger/10 text-status-danger'}`}>
                                    <BatteryCharging size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Available</p>
                                    <p className="font-bold text-primary">
                                        <span className={station.available > 0 ? 'text-status-success' : 'text-status-danger'}>
                                            {station.available}
                                        </span>
                                        <span className="text-gray-400 font-normal"> / {station.total}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <span className="inline-block bg-gray-100 text-primary text-xs font-bold px-2 py-1 rounded-lg">
                                    {station.power}
                                </span>
                            </div>
                        </div>

                        {/* Action button */}
                        <button
                            onClick={() => station.available > 0 && navigate(`/charging/${station.id}`)}
                            className={`mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm
              ${station.available > 0
                                    ? 'bg-ev-primary text-secondary hover:bg-teal-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            {station.available > 0 ? 'Reserve Slot' : 'Full'}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChargingStationList;
