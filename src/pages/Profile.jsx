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
    { id: 'account', label: 'Account Information', icon: Settings },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help Center', icon: CircleHelp },
];

const vehicleTypes = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Pickup Trunk', 'EV'];

const Profile = () => {
    const [selectedVehicleType, setSelectedVehicleType] = useState('SUV');
    const [showVehicleDetails, setShowVehicleDetails] = useState(false);
    const [carNumberPlate, setCarNumberPlate] = useState('YGN-12-4821');
    const [isEditingPlate, setIsEditingPlate] = useState(false);
    const navigate = useNavigate();

    // Account Settings State
    const [expandedAction, setExpandedAction] = useState(null);
    const [accountData, setAccountData] = useState({
        name: 'John Doe',
        goPayId: 'kmini_gopay01',
        phone: '+95 9 123 456 789',
        language: 'English',
        region: 'Yangon, Myanmar'
    });

    const [notificationSettings, setNotificationSettings] = useState({
        transactions: true,
        promotions: true,
        updates: false
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
            <div className="px-2 pt-2">
                <header className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-ev-primary text-secondary flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                            KM
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-black tracking-tight text-primary">John Doe</h1>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">{accountData.goPayId}</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-primary">
                            <UserRound size={18} />
                        </button>
                    </div>

                    <div className="mt-5 bg-gradient-to-r from-ev-primary to-ev-secondary text-secondary rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-white/80">Wallet Balance</p>
                                <p className="text-2xl font-black tracking-tight">MMK 250,000</p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                <Wallet size={20} />
                            </div>
                        </div>
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

                                {isExpanded && item.id === 'account' && (
                                    <div className="px-3 pb-6 animate-in slide-in-from-top-2 duration-300">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-4">
                                            {/* Personal Info */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                                                    <UserRound size={16} className="text-gray-400" />
                                                    <div className="flex-1">
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Full Name</p>
                                                        <input
                                                            type="text"
                                                            value={accountData.name}
                                                            onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                                                            className="text-sm font-bold text-primary bg-transparent outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                                                    <Globe size={16} className="text-gray-400" />
                                                    <div className="flex-1">
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">GoPay ID</p>
                                                        <input
                                                            type="text"
                                                            value={accountData.goPayId}
                                                            onChange={(e) => setAccountData({ ...accountData, goPayId: e.target.value })}
                                                            className="text-sm font-bold text-primary bg-transparent outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                                                    <Phone size={16} className="text-gray-400" />
                                                    <div className="flex-1">
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone Number</p>
                                                        <input
                                                            type="text"
                                                            value={accountData.phone}
                                                            onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                                                            className="text-sm font-bold text-primary bg-transparent outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preferences */}
                                            <div className="pt-2">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 px-1">Preferences</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Globe size={14} className="text-ev-primary" />
                                                            <p className="text-[10px] text-gray-400 font-bold">Language</p>
                                                        </div>
                                                        <select
                                                            value={accountData.language}
                                                            onChange={(e) => setAccountData({ ...accountData, language: e.target.value })}
                                                            className="text-xs font-black text-primary bg-transparent outline-none w-full appearance-none"
                                                        >
                                                            <option>English</option>
                                                            <option>Myanmar</option>
                                                        </select>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <MapPin size={14} className="text-ev-primary" />
                                                            <p className="text-[10px] text-gray-400 font-bold">Region</p>
                                                        </div>
                                                        <p className="text-xs font-black text-primary truncate">{accountData.region}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

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

                                {isExpanded && item.id === 'notifications' && (
                                    <div className="px-3 pb-6 animate-in slide-in-from-top-2 duration-300">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                                            {[
                                                { id: 'transactions', label: 'Transaction Alerts', sub: 'Payments & sessions', icon: Zap },
                                                { id: 'promotions', label: 'Promo & Offers', sub: 'Exclusive charging deals', icon: TicketPercent },
                                                { id: 'updates', label: 'App Updates', sub: 'New features & fixes', icon: Info }
                                            ].map((notif) => {
                                                const NotifIcon = notif.icon;
                                                return (
                                                    <div key={notif.id} className="bg-white p-4 rounded-xl border border-gray-50 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gray-50 text-ev-primary flex items-center justify-center">
                                                                <NotifIcon size={18} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-primary">{notif.label}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold">{notif.sub}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setNotificationSettings(prev => ({ ...prev, [notif.id]: !prev[notif.id] }))}
                                                            className="relative w-14 h-8 rounded-full transition-all duration-300"
                                                        >
                                                            <div
                                                                className={`absolute inset-0 rounded-full transition-all duration-300 ${notificationSettings[notif.id] ? 'bg-ev-primary' : 'bg-gray-200'}`}
                                                            />
                                                            <div
                                                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${notificationSettings[notif.id] ? 'translate-x-6' : ''}`}
                                                            />
                                                        </button>
                                                    </div>
                                                );
                                            })}
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

                <button className="w-full mt-3 bg-white text-status-danger rounded-2xl py-4 font-bold border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
