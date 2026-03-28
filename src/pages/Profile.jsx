import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    CreditCard,
    LogOut,
    Settings,
    ShieldCheck,
    UserRound,
    Wallet,
    Car,
    SquarePen,
    Mail,
    Phone,
    Globe,
    MapPin,
    FileText,
    MessageSquare,
    X,
    Zap,
    TicketPercent,
    Info,
    Headset,
    Send,
    TriangleAlert,
} from 'lucide-react';
import PaymentHistory from '../components/PaymentHistory';

const profileActions = [
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'help', label: 'Help Center', icon: CircleHelp },
];

const vehicleTypes = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Pickup Trunk', 'EV'];

const Profile = () => {
    const getInitials = (name) => {
        return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const [selectedVehicleType, setSelectedVehicleType] = useState('SUV');
    const [showVehicleDetails, setShowVehicleDetails] = useState(false);
    const [carNumberPlate, setCarNumberPlate] = useState('YGN-12-4821');
    const [isEditingPlate, setIsEditingPlate] = useState(false);
    const navigate = useNavigate();

    // Account Settings State
    const [expandedAction, setExpandedAction] = useState(null);
    const [accountData, setAccountData] = useState({
        name: localStorage.getItem('userName') || 'John Doe',
        goPayId: localStorage.getItem('userPhone') || 'kmini_gopay01',
        phone: localStorage.getItem('userPhone') || '+95 9 123 456 789',
        language: 'English',
        region: 'Yangon, Myanmar'
    });



    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="px-4 pt-6">
                <header className="bg-blue-600 rounded-[40px] p-8 shadow-[0_20px_40px_-10px_rgba(0,84,166,0.3)] border border-blue-500/20 mb-10 relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-24 h-24 rounded-[32px] bg-white text-blue-600 flex items-center justify-center font-black text-3xl shadow-xl mb-6 transform rotate-3 transition-transform hover:rotate-0 duration-500">
                            {getInitials(accountData.name)}
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">{accountData.name}</h1>
                        <p className="text-[10px] text-blue-100 font-bold uppercase tracking-[0.2em] opacity-80">{accountData.goPayId}</p>

                        <button className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[11px] font-bold text-white uppercase tracking-widest border border-white/20 transition-all active:scale-95">
                            Edit Profile
                        </button>
                    </div>
                </header>

                <section className="bg-white rounded-[32px] p-2 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.03)] border border-slate-50 mb-8">
                    <button
                        onClick={() => setShowVehicleDetails((prev) => !prev)}
                        className="w-full flex items-center justify-between px-5 py-5 rounded-[24px] text-left hover:bg-slate-50 transition-all group"
                    >
                        <span className="flex items-center gap-4">
                            <span className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                <Car size={20} className="stroke-[2.5px]" />
                            </span>
                            <span className="font-bold text-primary tracking-tight">My Vehicles</span>
                        </span>
                        <ChevronRight
                            size={18}
                            className={`text-gray-300 transition-all duration-300 ${showVehicleDetails ? 'rotate-90 text-blue-400' : ''}`}
                        />
                    </button>

                    {showVehicleDetails && (
                        <div className="px-5 pb-5 animate-in slide-in-from-top-4 duration-500">
                            <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-5 mb-4">
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Number Plate</p>
                                <div className="flex items-center justify-between">
                                    {isEditingPlate ? (
                                        <input
                                            type="text"
                                            value={carNumberPlate}
                                            onChange={(e) => setCarNumberPlate(e.target.value.toUpperCase())}
                                            onBlur={() => setIsEditingPlate(false)}
                                            className="flex-1 min-w-0 mr-4 text-xl font-bold tracking-tight text-blue-600 bg-transparent outline-none border-b-2 border-blue-200"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-xl font-bold tracking-tight text-primary transition-colors hover:text-blue-600">{carNumberPlate}</p>
                                    )}
                                    <button
                                        onClick={() => setIsEditingPlate((prev) => !prev)}
                                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all active:scale-90"
                                    >
                                        <SquarePen size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-5">
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3 text-left">Vehicle Category</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {vehicleTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedVehicleType(type)}
                                            className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedVehicleType === type
                                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                    : 'bg-white text-gray-400 border border-slate-100'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="h-px bg-slate-50 mx-5 my-1" />

                    {profileActions.map((item, index) => {
                        const Icon = item.icon;
                        const isExpanded = expandedAction === item.id;

                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => setExpandedAction(isExpanded ? null : item.id)}
                                    className="w-full flex items-center justify-between px-5 py-5 rounded-[24px] text-left hover:bg-slate-50 transition-all group"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className="w-11 h-11 rounded-2xl bg-slate-50 text-gray-400 flex items-center justify-center transition-all group-hover:bg-blue-50 group-hover:text-blue-600">
                                            <Icon size={20} className="stroke-[2.2px]" />
                                        </span>
                                        <span className="font-bold text-primary tracking-tight">{item.label}</span>
                                    </span>
                                    <ChevronRight
                                        size={18}
                                        className={`text-gray-300 transition-all duration-300 ${isExpanded ? 'rotate-90 text-blue-400' : ''}`}
                                    />
                                </button>

                                {isExpanded && item.id === 'security' && (
                                    <div className="px-5 pb-6 animate-in slide-in-from-top-4 duration-500">
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => navigate('/terms')}
                                                className="w-full flex items-center justify-between bg-slate-50 p-5 rounded-3xl border border-slate-100/50 hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-[0.98] group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                                                        <FileText size={18} />
                                                    </div>
                                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Terms & Conditions</span>
                                                </div>
                                                <CircleHelp size={16} className="text-slate-300 group-hover/item:text-blue-400" />
                                            </button>

                                            <button
                                                onClick={() => navigate('/faq')}
                                                className="w-full flex items-center justify-between bg-slate-50 p-5 rounded-3xl border border-slate-100/50 hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-[0.98] group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                                                        <MessageSquare size={18} />
                                                    </div>
                                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">FAQ</span>
                                                </div>
                                                <CircleHelp size={16} className="text-slate-300 group-hover/item:text-blue-400" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {isExpanded && item.id === 'help' && (
                                    <div className="px-5 pb-6 animate-in slide-in-from-top-4 duration-500">
                                        <div className="grid gap-3">
                                            <button className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100/50 hover:bg-blue-50 hover:border-blue-100 transition-all group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                                                    <Headset size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Live Support</p>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">Chat 24/7 with our team</p>
                                                </div>
                                            </button>

                                            <button className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100/50 hover:bg-blue-50 hover:border-blue-100 transition-all group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                                                    <Send size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Send Feedback</p>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">Help us improve GoPay</p>
                                                </div>
                                            </button>

                                            <button className="flex items-center gap-4 bg-red-50/50 p-5 rounded-3xl border border-red-100/50 hover:bg-red-50 transition-all group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-white text-red-500 flex items-center justify-center shadow-sm border border-red-50">
                                                    <TriangleAlert size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Report Issue</p>
                                                    <p className="text-[10px] text-red-400 font-bold mt-0.5">Station or app problems</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {index !== profileActions.length - 1 && <div className="h-px bg-slate-50 mx-5 my-1" />}
                            </div>
                        );
                    })}
                </section>

                <div className="mt-2">
                    <PaymentHistory />
                </div>
            </div>
        </div>
    );
};

export default Profile;
