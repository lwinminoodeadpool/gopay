import { QrCode, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3 gap-3 mb-8">
            <button
                onClick={() => navigate('/charge')}
                className="bg-ev-primary text-secondary p-4 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-ev-primary/20 hover:-translate-y-1 transition-transform"
            >
                <div className="bg-white/20 p-3 rounded-full">
                    <Zap size={24} className="fill-white" />
                </div>
                <span className="text-xs font-bold">Charge EV</span>
            </button>

            <button className="bg-white text-primary p-4 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                <div className="bg-gray-50 p-3 rounded-full text-accent">
                    <QrCode size={24} />
                </div>
                <span className="text-xs font-bold">Scan QR</span>
            </button>

            <button className="bg-white text-primary p-4 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                <div className="bg-gray-50 p-3 rounded-full text-ev-secondary">
                    <MapPin size={24} />
                </div>
                <span className="text-xs font-bold">Find Station</span>
            </button>
        </div>
    );
};

export default QuickActions;
