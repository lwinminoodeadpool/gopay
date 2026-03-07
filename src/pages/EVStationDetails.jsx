import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ChevronLeft,
    Heart,
    Phone,
    Clock,
    CircleDollarSign,
    Utensils,
    MapPin,
    Navigation,
    Briefcase,
    Telescope,
    ArrowRightCircle,
    Zap
} from 'lucide-react';

const stationsData = {
    1: {
        name: "Café JJ",
        location: "Bahan",
        distance: "1.5 km",
        business: "Café JJ-Yangon",
        hours: "24 Hours",
        phone: "09977222049",
        price: "1500 MMK / kWh",
        service: "Self Charge",
        address: "No.44(B), Nat Mauk Road, Bahan, Yangon.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    },
    2: {
        name: "12 INYA Fusion & Lounge",
        location: "Mayangone",
        distance: "1.9 km",
        business: "12 INYA Group",
        hours: "11:00 AM - 11:00 PM",
        phone: "09880123456",
        price: "1500 MMK / kWh",
        service: "Restaurant",
        address: "No.12, Inya Lake Side, Mayangone, Yangon.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    },
    3: {
        name: "Melia Yangon Hotel",
        location: "Bahan",
        distance: "2.3 km",
        business: "Melia Hotels Int.",
        hours: "9:00 AM - 9:00 PM",
        phone: "019345000",
        price: "1800 MMK / kWh",
        service: "Hotel / Lobby",
        address: "No.192, Kaba Aye Pagoda Road, Bahan, Yangon.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    4: {
        name: "Mandalay Hill Resort",
        location: "Mandalay",
        distance: "0.8 km",
        business: "Mandalay Resort",
        hours: "Always Open",
        phone: "024035678",
        price: "1600 MMK / kWh",
        service: "Hotel / Mall",
        address: "No.9, Kwin (413), Near Mandalay Hill, Mandalay.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    5: {
        name: "Capital EV Hub",
        location: "Nay Pyi Taw",
        distance: "2.1 km",
        business: "Capital Hypermarket",
        hours: "8:00 AM - 10:00 PM",
        phone: "067123456",
        price: "1500 MMK / kWh",
        service: "Shopping",
        address: "No.1, Yaza Thingaha Road, Ottarathiri, Nay Pyi Taw.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
    6: {
        name: "115 Miles Stop",
        location: "Expressway",
        distance: "52 km",
        business: "Fast Food Center",
        hours: "24 Hours",
        phone: "09115000000",
        price: "1500 MMK / kWh",
        service: "Self Charge",
        address: "115 Miles, Yangon-Mandalay Expressway.",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    },
    7: {
        name: "Bago Royal Station",
        location: "Bago City",
        distance: "3.5 km",
        business: "Bago Energy",
        hours: "7:00 AM - 9:00 PM",
        phone: "05221122",
        price: "1500 MMK / kWh",
        service: "Self Charge",
        address: "Main Road, Near Bago Railway Station, Bago.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    8: {
        name: "Sky Suites",
        location: "Yangon",
        distance: "2.7 km",
        business: "Sky Residences",
        hours: "Always Open",
        phone: "09777111222",
        price: "2000 MMK / kWh",
        service: "Hotel / Mall",
        address: "Bahan Tower, Link Road, Yangon.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    9: {
        name: "MG Yangon",
        location: "Bahan",
        distance: "2.7 km",
        business: "MG Myanmar",
        hours: "9:00 AM - 6:00 PM",
        phone: "09MG123456",
        price: "1500 MMK / kWh",
        service: "Self Charge",
        address: "MG Showroom, Kaba Aye Pagoda Road, Yangon.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
    10: {
        name: "Essential Motors",
        location: "Yangon",
        distance: "3.2 km",
        business: "Essential Group",
        hours: "8:00 AM - 8:00 PM",
        phone: "0991234567",
        price: "1700 MMK / kWh",
        service: "Self Charge",
        address: "Ahlone Road, Dagon Township, Yangon.",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    }
};

const EVStationDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const station = stationsData[id] || stationsData[1]; // Fallback for demo

    return (
        <div className="min-h-screen bg-background-soft pb-10">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-50 border-b border-gray-50 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-black text-primary tracking-tight flex-1">{station.name}</h1>
                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all">
                    <Heart size={18} />
                </button>
            </header>

            {/* Hero Image */}
            <div className="w-full h-64 relative bg-gray-200">
                <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover"
                />
                {/* Carousel indicators dot (visual only) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-80">
                    <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                    <div className="w-2 h-2 rounded-full bg-ev-primary shadow-[0_0_8px_rgba(13,148,136,0.6)]"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                </div>
            </div>

            <main className="p-4 -mt-6 relative z-10 flex flex-col gap-5">
                {/* Header Info Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-black text-primary leading-tight">{station.name}</h2>
                            <p className="text-ev-primary font-bold text-base mt-1">{station.location}</p>
                        </div>
                        {/* Availability Badge */}
                        <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-2xl font-bold text-xs flex items-center gap-1.5">
                            <Zap size={14} className="fill-current" /> Available
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mb-6 bg-[#F8F9FA] p-4 rounded-2xl border border-gray-50">
                        <div className="text-ev-primary mt-0.5"><MapPin size={20} /></div>
                        <p className="text-gray-600 font-semibold text-sm leading-relaxed">{station.address}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button className="flex-1 bg-ev-primary/10 text-ev-primary py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all border border-ev-primary/20">
                            <Phone size={18} /> Call
                        </button>
                        <button className="flex-[2] bg-ev-primary text-secondary py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-ev-primary/20 active:scale-95 transition-all">
                            <Navigation size={18} /> Get Directions
                        </button>
                    </div>
                </div>

                {/* Details Grid Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-primary mb-4">Station Details</h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Telescope size={20} /></div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-0.5">Distance</p>
                                <p className="text-gray-900 font-bold text-sm">{station.distance}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2.5 rounded-xl text-purple-500"><Briefcase size={20} /></div>
                            <div className="min-w-0">
                                <p className="text-gray-400 text-xs font-semibold mb-0.5">Business</p>
                                <p className="text-gray-900 font-bold text-sm truncate">{station.business}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-500"><Clock size={20} /></div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-0.5">Hours</p>
                                <p className="text-gray-900 font-bold text-sm">{station.hours}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-500"><Phone size={20} /></div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-0.5">Contact</p>
                                <p className="text-gray-900 font-bold text-sm">{station.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-green-50 p-2.5 rounded-xl text-green-500"><Utensils size={20} /></div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-0.5">Service</p>
                                <p className="text-gray-900 font-bold text-sm">{station.service}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing & KBZPay Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold text-lg text-primary">Charging Rate</h3>
                        <div className="flex items-center gap-2 bg-ev-primary/10 px-4 py-2 rounded-xl text-ev-primary">
                            <CircleDollarSign size={20} />
                            <span className="font-black text-lg">{station.price}</span>
                        </div>
                    </div>

                    {/* KBZPay Button */}
                    <button className="w-full bg-[#0055A6] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-95 transition-all mt-2">
                        <div className="px-2 py-0.5 bg-white text-[#0055A6] rounded text-xs italic font-black">KBZPay</div>
                        Pay with KBZPay
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EVStationDetails;
