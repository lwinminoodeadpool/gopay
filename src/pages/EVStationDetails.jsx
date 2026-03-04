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
        chargingPoints: [
            { id: 1, name: "Café JJ 1", type: "AC GBT", power: "7 kW", status: "Available" },
            { id: 2, name: "Café JJ 2", type: "AC GBT", power: "7 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "INYA 1", type: "DC CCS2", power: "60 kW", status: "Available" },
            { id: 2, name: "INYA 2", type: "AC GBT", power: "22 kW", status: "Offline" }
        ]
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
        chargingPoints: [
            { id: 1, name: "Melia Pad 1", type: "DC CCS2", power: "120 kW", status: "Available" },
            { id: 2, name: "Melia Pad 2", type: "DC CCS2", power: "120 kW", status: "Occupied" }
        ]
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
        chargingPoints: [
            { id: 1, name: "MDY-1", type: "AC GBT", power: "7 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "HUB 1", type: "DC CHAdeMO", power: "50 kW", status: "Available" },
            { id: 2, name: "HUB 2", type: "DC CCS2", power: "50 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "EXPWY A", type: "DC CCS2", power: "180 kW", status: "Available" },
            { id: 2, name: "EXPWY B", type: "DC CCS2", power: "180 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "BAGO-1", type: "AC GBT", power: "11 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "SKY 1", type: "DC CCS2", power: "30 kW", status: "Occupied" }
        ]
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
        chargingPoints: [
            { id: 1, name: "MG-A", type: "AC GBT", power: "7 kW", status: "Available" }
        ]
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
        chargingPoints: [
            { id: 1, name: "EM-1", type: "DC CCS2", power: "60 kW", status: "Available" }
        ]
    }
};

const EVStationDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const station = stationsData[id] || stationsData[1]; // Fallback for demo

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-10">
            {/* Dark Header */}
            <header className="bg-[#1D1D1B] pt-4 pb-2 px-4 flex items-center sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="text-white p-1">
                    <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <h1 className="flex-1 text-center text-white font-bold text-lg">{station.name}</h1>
                <button className="text-white p-1">
                    <Heart size={24} />
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

            <main className="p-4 -mt-4 relative">
                {/* Station Info Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-primary leading-tight">{station.name}</h2>
                            <p className="text-ev-primary font-bold text-lg mt-0.5">{station.location}</p>
                        </div>
                        <button className="bg-ev-primary text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-ev-primary/20 active:scale-95 transition-all">
                            Call
                        </button>
                    </div>

                    <div className="h-[1px] bg-gray-50 w-full mb-6" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><Telescope size={20} /></div>
                            <span className="text-ev-primary font-black text-sm">{station.distance}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><Briefcase size={20} /></div>
                            <span className="text-gray-600 font-bold text-sm tracking-tight truncate">{station.business}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><Clock size={20} /></div>
                            <span className="text-gray-600 font-bold text-sm">{station.hours}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><Phone size={20} /></div>
                            <span className="text-gray-600 font-bold text-sm">{station.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><CircleDollarSign size={20} /></div>
                            <span className="text-ev-primary font-black text-sm">{station.price}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400"><Utensils size={20} /></div>
                            <span className="text-gray-600 font-bold text-sm">{station.service}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-6">
                        <div className="text-gray-400 mt-0.5"><MapPin size={20} /></div>
                        <p className="text-gray-600 font-bold text-sm leading-relaxed">{station.address}</p>
                    </div>

                    {/* Directions Section */}
                    <div className="mt-8 bg-[#F8F9FA] rounded-[2rem] p-5 flex items-center justify-between border border-gray-100">
                        <div className="flex-1 mr-4">
                            <p className="text-gray-600 text-xs font-bold leading-relaxed">
                                သင်၏တည်နေရာမှ အားသွင်းရုံသို့ သွားရန် လမ်းကြောင်းအား Google Map တွင် ကြည့်ရန်
                            </p>
                        </div>
                        <button className="bg-ev-primary text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm whitespace-nowrap active:scale-95 transition-all">
                            <ArrowRightCircle size={14} />
                            Directions
                        </button>
                    </div>
                </div>

                {/* Charging Points Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-black text-primary px-2 mb-4 tracking-tight">Charging Points</h3>

                    <div className="space-y-4">
                        {station.chargingPoints.map((point) => (
                            <div key={point.id} className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 group">
                                <div className="border border-gray-200 rounded-lg px-4 py-2 font-black text-sm text-primary mr-6 bg-white shadow-sm group-hover:border-emerald-400 transition-colors">
                                    {point.name}
                                </div>

                                <div className="flex flex-col items-center mr-8">
                                    <div className="text-ev-primary bg-ev-primary/10 p-1.5 rounded-full mb-1">
                                        <Zap size={18} fill="currentColor" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 tracking-tighter">{point.type}</span>
                                </div>

                                <div className="flex-1">
                                    <p className="text-lg font-black text-primary leading-none">{point.power}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-ev-primary font-black text-xs uppercase tracking-wider">{point.status}</span>
                                    <div className="w-5 h-5 rounded-full border-2 border-ev-primary flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-ev-primary"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EVStationDetails;
