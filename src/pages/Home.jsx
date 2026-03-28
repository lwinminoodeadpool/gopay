import { Bell, Search } from 'lucide-react';
import ParkingManagement from '../components/ParkingManagement';
import ChargingStationList from '../components/ChargingStationList';
import PromoBanners from '../components/PromoBanners';
import EVAccessories from '../components/EVAccessories';
import { useEffect, useState } from 'react';
import { apiPost, ENDPOINTS } from '../services/apiClient';

const Home = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || 'John Doe');

    const getInitials = (name) => {
        return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    useEffect(() => {
        const initSDK = async () => {
            try {
                window.ma.getAuthCode({
                    scopes:
                        ['USER_NICKNAME',
                            'PLAINTEXT_MOBILE_PHONE'],
                    success: async function (res) {
                        console.log(res);
                        let token = res.authCode;
                        try {
                            const response = await apiPost(ENDPOINTS.AUTOLOGIN, {
                                authCode: token
                            });
                            console.log('Autologin response:', response);

                            if (response?.result) {
                                const fetchedName = response.result.name || 'John Doe';
                                const fetchedPhone = response.result.Bill_Payments__phoneNumber__CST || '';

                                localStorage.setItem('userName', fetchedName);
                                localStorage.setItem('userPhone', fetchedPhone);
                                setUserName(fetchedName);
                            }
                        } catch (error) {
                            console.error('Autologin error:', error);
                        }
                    }
                })
            } catch (error) {
                console.error('Error:', error);
            }
        };

        initSDK();
    }, []);
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
            {/* Top App Bar */}
            <header className="flex justify-between items-center mb-8 px-4 pt-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-ev-primary text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border border-blue-100">
                        {getInitials(userName)}
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Welcome back</p>
                        <h1 className="text-xl font-bold text-primary tracking-tight">{userName}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 hover:text-blue-600 transition-all border border-gray-50 active:scale-95">
                        <Search size={20} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 relative hover:text-blue-600 transition-all border border-gray-50 active:scale-95">
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
                        <Bell size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Sections */}
            <div className="px-2">
                <ParkingManagement />
                <PromoBanners />
                <ChargingStationList />
                <EVAccessories />
            </div>
        </div>
    );
};

export default Home;
