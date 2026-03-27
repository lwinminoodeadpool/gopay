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
        <div className="fixed bottom-0 w-full max-w-md bg-secondary border-t border-gray-100 flex justify-around items-center px-4 py-3 pb-8 shadow-lg z-50 rounded-t-2xl">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className={`flex flex-col items-center justify-center gap-1 group relative transition-all duration-300 ease-in-out ${isActive ? 'w-16 -mt-8' : 'w-12 mt-0'}`}
                    >
                        {/* Cutout background (only visible when active) */}
                        <div
                            className={`absolute -inset-2 bg-white rounded-full -z-20 transition-all duration-300 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.05)] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                        />

                        {/* Circle Background */}
                        <div
                            className={`flex items-center justify-center rounded-full transition-all duration-500 z-10 shadow-md ${isActive
                                    ? 'w-16 h-16 bg-ev-primary text-white shadow-[0_8px_16px_rgba(250,204,21,0.4)] translate-y-0'
                                    : 'w-10 h-10 bg-transparent text-gray-400 group-hover:-translate-y-1 group-hover:bg-gray-50'
                                }`}
                        >
                            <Icon size={isActive ? 30 : 22} className={isActive ? 'stroke-[2px]' : 'stroke-[1.5px] group-hover:text-ev-primary'} />
                        </div>

                        {/* Label */}
                        <span
                            className={`font-bold transition-all duration-300 mt-1 whitespace-nowrap ${isActive ? 'text-ev-primary text-[11px]' : 'text-gray-400 text-[10px] group-hover:text-ev-primary'
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