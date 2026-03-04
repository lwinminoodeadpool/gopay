import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    ArrowLeft,
    BatteryCharging,
    MapPin,
    Zap,
    Search,
    Filter,
    Star,
    X
} from 'lucide-react';

// Map region IDs to Burmese names for the sub-header
const regionNames = {
    highway: 'အမြန်လမ်း (Highway)',
    yangon: 'ရန်ကုန် (Yangon)',
    mandalay: 'မန္တလေး (Mandalay)',
    naypyidaw: 'နေပြည်တော် (Nay Pyi Taw)',
    bago: 'ပဲခူး (Bago)',
    ayeyarwaddy: 'ဧရာဝတီ (Ayeyarwaddy)',
    mon: 'မွန် (Mon)',
    shan: 'ရှမ်း (Shan)',
    magway: 'မကွေး (Magway)',
    sagaing: 'စစ်ကိုင်း (Sagaing)',
    tanintharyi: 'တနင်္သာရီ (Tanintharyi)',
    rakhine: 'ရခိုင် (Rakhine)',
    kachin: 'ကယား (Kachin)',
    kayah: 'ကယား (Kayah)',
    kayin: 'ကရင် (Kayin)',
    chin: 'ချင်း (Chin)'
};

const allStations = [
    { id: 1, region: 'yangon', name: "Café JJ", distance: "1.5 km", time: "24 hours", location: "Bahan, Yangon", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80" },
    { id: 2, region: 'yangon', name: "12 INYA Fusion & Lounge", distance: "1.9 km", time: "11:00 AM - 11:00 PM", location: "Mayangone, Yangon", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80" },
    { id: 3, region: 'yangon', name: "Melia Yangon Hotel", distance: "2.3 km", time: "9:00 AM To 9:00 PM", location: "Bahan, Yangon", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
    { id: 4, region: 'mandalay', name: "Mandalay Hill Resort", distance: "0.8 km", time: "Always Open", location: "Mandalay", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
    { id: 5, region: 'naypyidaw', name: "Capital EV Hub", distance: "2.1 km", time: "Always open", location: "Nay Pyi Taw", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
    { id: 6, region: 'highway', name: "115 Miles Stop", distance: "52 km", time: "24 Hours", location: "Yangon-Mandalay Expressway", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80" },
    { id: 7, region: 'bago', name: "Bago Royal Station", distance: "3.5 km", time: "7:00 AM - 9:00 PM", location: "Bago City", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
    { id: 8, region: 'yangon', name: "Sky Suites", distance: "2.7 km", time: "Always Open", location: "Yangon", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
    { id: 9, region: 'yangon', name: "MG Yangon", distance: "2.7 km", time: "Always open", location: "Bahan", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
    { id: 10, region: 'yangon', name: "Essential Motors", distance: "3.2 km", time: "8:00 AM TO 8:00 PM", location: "Yangon", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80" },
];

const EVStationList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const filters = location.state || {};
    const selectedRegion = filters.region;
    const [searchQuery, setSearchQuery] = useState('');

    // List item component for consistency
    const StationItem = ({ station }) => (
        <div
            key={station.id}
            className="group p-4 flex gap-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 relative border-b border-gray-50 last:border-b-0"
        >
            {/* Thumbnail */}
            <div className="w-32 h-26 rounded-2xl overflow-hidden flex-shrink-0 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] border border-gray-100 bg-gray-50 relative">
                <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {station.region === 'highway' && (
                    <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm p-1 rounded-lg">
                        <Zap size={10} className="text-orange-500 fill-orange-500" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <h3 className="text-ev-primary font-bold text-[15px] leading-tight group-hover:text-teal-700 transition-colors">
                        {station.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-gray-300" />
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wide">{station.location}</p>
                    </div>
                </div>

                <div className="space-y-0.5">
                    <p className="text-gray-700 font-black text-xs">{station.time}</p>
                    <p className="text-ev-primary font-extrabold text-xs">{station.distance}</p>
                </div>
            </div>

            {/* Action */}
            <div className="flex items-center">
                <button
                    onClick={() => navigate(`/station-details/${station.id}`)}
                    className="border-2 border-gray-200 text-gray-700 w-20 py-2 rounded-2xl text-xs font-black shadow-sm active:scale-95 transition-all bg-white hover:border-ev-primary hover:text-ev-primary hover:shadow-md"
                >
                    View
                </button>
            </div>
        </div>
    );

    // Filter stations based on selection and search query
    const filteredStations = allStations.filter(station => {
        const matchesRegion = selectedRegion ? station.region === selectedRegion : true;
        const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            station.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
    });

    // Region label for the sub-header
    const regionLabel = selectedRegion ? regionNames[selectedRegion] : 'All Regions';

    return (
        <div className="min-h-screen bg-white font-sans text-primary">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 py-3.5 px-4 flex items-center sticky top-0 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
                <h1 className="flex-1 text-center text-lg font-black text-primary pr-8 uppercase tracking-tighter">EV charging station</h1>
            </header>

            {/* Search Bar Section */}
            <div className="p-4 bg-white sticky top-[57px] z-30 border-b border-gray-50 shadow-sm">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-ev-primary transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search stations, cities, locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-100 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-ev-primary/20 focus:bg-white transition-all outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Station List */}
            <main className="pb-20">
                {filteredStations.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                        {filteredStations.map((station) => (
                            <StationItem key={station.id} station={station} />
                        ))}
                        {/* Mock padding for high station count visual */}
                        {!selectedRegion && (
                            <div className="p-8 text-center bg-gray-50/50">
                                <p className="text-gray-400 text-xs font-medium">Scroll down to see more results</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={40} />
                        </div>
                        <h3 className="text-gray-800 font-black text-lg mb-2">No results found</h3>
                        <p className="text-gray-400 font-medium text-sm leading-relaxed px-6">
                            We couldn't find any stations in <span className="text-ev-primary font-bold">{regionLabel}</span> right now.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-8 bg-ev-primary text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-ev-primary/20 active:scale-95 transition-all"
                        >
                            Change Filters
                        </button>
                    </div>
                )}
            </main>

            {/* Floating Quick Filter Bar (Mock) */}
            <div className="fixed bottom-28 right-4 z-40">
                <button className="bg-white p-3 rounded-full shadow-2xl border border-gray-100 text-primary active:scale-90 transition-all">
                    <Search size={22} />
                </button>
            </div>

            {/* Spacing for Bottom Nav */}
            <div className="h-20" />
        </div>
    );
};

export default EVStationList;
