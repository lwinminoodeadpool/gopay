import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, PlugZap, User, MapPin } from 'lucide-react';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on current path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/parking')) return 'parking';
        if (path.startsWith('/charge') || path.startsWith('/charging')) return 'charge';
        if (path.startsWith('/explore')) return 'explore';
        if (path.startsWith('/profile')) return 'profile';
        return 'home';
    };

    const activeTab = getActiveTab();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const navItems = [
        { id: 'parking', icon: MapPin, label: 'Parking', path: '/parking' },
        { id: 'charge', icon: PlugZap, label: 'Charge', path: '/charge' },
        { id: 'home', icon: Home, label: 'Home', path: '/' },
        { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
        { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-4 py-3 pb-8 z-50 rounded-t-[32px] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className="flex flex-col items-center justify-center gap-1.5 min-w-[64px] relative py-1 transition-all duration-300 active:scale-90"
                    >
                        {/* Active Indicator Bar */}
                        <div
                            className={`absolute -top-3 w-8 h-1 bg-ev-primary rounded-full transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                }`}
                        />

                        <div
                            className={`flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive
                                    ? 'w-11 h-11 bg-ev-primary shadow-[0_8px_20px_rgba(0,84,166,0.3)] text-white'
                                    : 'w-10 h-10 bg-transparent text-gray-400'
                                }`}
                        >
                            <Icon size={isActive ? 22 : 24} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
                        </div>

                        <span
                            className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-ev-primary' : 'text-gray-400'
                                }`}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;