import { Bell, Search } from 'lucide-react';
import ParkingManagement from '../components/ParkingManagement';
import ChargingStationList from '../components/ChargingStationList';
import EVAccessories from '../components/EVAccessories';
import PaymentHistory from '../components/PaymentHistory';

const Home = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
            {/* Top App Bar */}
            <header className="flex justify-between items-center mb-8 px-2 pt-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-ev-primary text-secondary rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-white">
                        JD
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Good Morning,</p>
                        <h1 className="text-xl font-black text-primary tracking-tight">John Doe</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-gray-50 transition-colors border border-gray-100">
                        <Search size={20} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary relative hover:bg-gray-50 transition-colors border border-gray-100">
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-danger rounded-full border-2 border-white"></span>
                        <Bell size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Sections */}
            <div className="px-2">
                <ParkingManagement />
                <ChargingStationList />
                <EVAccessories />
                <PaymentHistory />
            </div>
        </div>
    );
};

export default Home;
