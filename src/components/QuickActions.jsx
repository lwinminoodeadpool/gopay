import { QrCode, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3 gap-3 mb-12">
            <button
                onClick={() => navigate('/charge')}
                className="bg-blue-600 text-white p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 shadow-xl shadow-blue-200/50 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 group"
            >
                <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/30 transition-colors">
                    <Zap size={24} fill="currentColor" strokeWidth={0} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Charge</span>
            </button>

            <button className="bg-white text-primary p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:-translate-y-1 transition-all active:scale-95 group">
                <div className="bg-slate-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <QrCode size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Scan</span>
            </button>

            <button className="bg-white text-primary p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:-translate-y-1 transition-all active:scale-95 group">
                <div className="bg-slate-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <MapPin size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Find</span>
            </button>
        </div>
    );
};

export default QuickActions;
