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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
            <div className="px-2 pt-2">
                <header className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-ev-primary text-secondary flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                            {getInitials(accountData.name)}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-black tracking-tight text-primary">{accountData.name}</h1>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">{accountData.goPayId}</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-primary">
                            <UserRound size={18} />
                        </button>
                    </div>


                </header>

                <section className="bg-white rounded-3xl p-3 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 mb-6">
                    <button
                        onClick={() => setShowVehicleDetails((prev) => !prev)}
                        className="w-full flex items-center justify-between px-3 py-4 rounded-2xl text-left hover:bg-gray-50 transition-colors border-b border-gray-50"
                    >
                        <span className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-gray-50 text-primary flex items-center justify-center border border-gray-100">
                                <Car size={18} />
                            </span>
                            <span className="font-semibold text-primary">My Vehicles</span>
                        </span>
                        <ChevronDown
                            size={18}
                            className={`text-gray-400 transition-transform ${showVehicleDetails ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {showVehicleDetails && (
                        <div className="px-3 py-4 mb-2 bg-gray-50 rounded-2xl mt-3">
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
                                <p className="text-xs text-gray-500 font-semibold mb-1">Car Number Plate</p>
                                <div className="flex items-center justify-between">
                                    {isEditingPlate ? (
                                        <input
                                            type="text"
                                            value={carNumberPlate}
                                            onChange={(e) => setCarNumberPlate(e.target.value.toUpperCase())}
                                            onBlur={() => setIsEditingPlate(false)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setIsEditingPlate(false);
                                                }
                                            }}
                                            className="flex-1 min-w-0 mr-3 text-lg font-black tracking-tight text-primary bg-transparent outline-none border-b border-ev-primary"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-lg font-black tracking-tight text-primary">{carNumberPlate}</p>
                                    )}
                                    <button
                                        onClick={() => setIsEditingPlate((prev) => !prev)}
                                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors"
                                        aria-label="Edit car number plate"
                                    >
                                        <SquarePen size={16} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 font-semibold mb-2">Vehicle Type</p>
                                <select
                                    value={selectedVehicleType}
                                    onChange={(e) => setSelectedVehicleType(e.target.value)}
                                    className="w-full px-3 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-primary outline-none focus:border-ev-primary"
                                >
                                    {vehicleTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {profileActions.map((item, index) => {
                        const Icon = item.icon;
                        const isExpanded = expandedAction === item.id;

                        return (
                            <div key={item.id} className={index !== profileActions.length - 1 ? 'border-b border-gray-50' : ''}>
                                <button
                                    onClick={() => setExpandedAction(isExpanded ? null : item.id)}
                                    className="w-full flex items-center justify-between px-3 py-4 rounded-2xl text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-xl bg-gray-50 text-primary flex items-center justify-center border border-gray-100">
                                            <Icon size={18} />
                                        </span>
                                        <span className="font-semibold text-primary">{item.label}</span>
                                    </span>
                                    <ChevronRight
                                        size={18}
                                        className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                    />
                                </button>



                                {isExpanded && item.id === 'security' && (
                                    <div className="px-3 pb-6 animate-in slide-in-from-top-2 duration-300">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                                            <button
                                                onClick={() => navigate('/terms')}
                                                className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FileText size={18} className="text-ev-primary" />
                                                    <span className="text-sm font-bold text-primary">Terms & Conditions</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </button>

                                            <button
                                                onClick={() => navigate('/faq')}
                                                className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <MessageSquare size={18} className="text-ev-primary" />
                                                    <span className="text-sm font-bold text-primary">FAQ</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </button>
                                        </div>
                                    </div>
                                )}



                                {isExpanded && item.id === 'help' && (
                                    <div className="px-3 pb-6 animate-in slide-in-from-top-2 duration-300">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                                            <button className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-ev-primary/10 text-ev-primary flex items-center justify-center">
                                                        <Headset size={18} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-primary">Live Support</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">Chat with our team 24/7</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </button>

                                            <button className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-ev-primary/10 text-ev-primary flex items-center justify-center">
                                                        <Send size={18} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-primary">Send Feedback</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">Help us improve GoPay</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </button>

                                            <button className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all active:scale-[0.98]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-red-50 text-status-danger flex items-center justify-center">
                                                        <TriangleAlert size={18} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-primary">Report a Problem</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">Station or app issues</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>


                <PaymentHistory />


            </div>
        </div>
    );
};

export default Profile;
