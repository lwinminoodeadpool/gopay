import { Home, Compass, PlugZap, User, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on path
    const getActiveTab = () => {
        if (location.pathname.includes('/charging')) return 'charge';
        if (location.pathname === '/' || location.pathname === '') return 'home';
        return 'home';
    };

    const activeTab = getActiveTab();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home', path: '/' },
        { id: 'parking', icon: MapPin, label: 'Parking', path: '/' },
        { id: 'charge', icon: PlugZap, label: 'Charge', path: '/charging/1' },
        { id: 'explore', icon: Compass, label: 'Explore', path: '/' },
        { id: 'profile', icon: User, label: 'Profile', path: '/' },
    ];

    return (
        <div className="fixed bottom-0 w-full max-w-md bg-secondary border-t border-gray-100 px-6 py-3 pb-8 shadow-lg z-50 rounded-t-2xl">
            <div className="flex justify-between items-center relative">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className="flex flex-col items-center justify-center gap-1 group relative transition-all duration-300 w-12"
                        >
                            {/* Highlight background pill */}
                            <div
                                className={`absolute inset-0 bg-ev-secondary/20 rounded-xl transition-all duration-300 -z-10
                ${isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-50 group-hover:opacity-50 group-hover:scale-100'}`}
                            />

                            <Icon
                                size={24}
                                className={`transition-colors duration-300 drop-shadow-sm
                  ${isActive ? 'text-ev-primary stroke-[2.5px]' : 'text-gray-400 group-hover:text-gray-600'}`}
                            />
                            <span
                                className={`text-[10px] font-medium transition-all duration-300
                  ${isActive ? 'text-ev-primary translate-y-0.5' : 'text-gray-400 -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
