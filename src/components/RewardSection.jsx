import { Gift, Zap } from 'lucide-react';

const RewardSection = () => {
    return (
        <section className="mb-8">
            <div className="bg-gradient-to-r from-accent to-yellow-300 rounded-3xl p-6 shadow-lg relative overflow-hidden text-primary">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                    <Gift size={120} />
                </div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/30 rounded-full blur-xl"></div>
                <div className="absolute top-4 right-20 w-16 h-16 bg-white/40 rounded-full blur-md"></div>

                <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={20} fill="currentColor" strokeWidth={1} />
                        <h3 className="font-bold text-sm uppercase tracking-wider">Go Rewards</h3>
                    </div>

                    <div className="flex items-end gap-1 my-3">
                        <span className="text-4xl font-black font-mono tracking-tighter">2,450</span>
                        <span className="text-sm font-bold mb-1">pts</span>
                    </div>

                    <p className="text-xs text-primary/80 font-medium mb-5 max-w-[200px]">
                        Just 550 points away from <strong className="text-primary font-black">Gold Tier</strong>
                    </p>

                    <div className="w-full bg-primary/10 rounded-full h-2 mb-2 backdrop-blur-sm overflow-hidden">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>

                    <div className="flex justify-between text-[10px] font-bold text-primary/70">
                        <span>Silver</span>
                        <span>3,000 pts</span>
                    </div>

                    <button className="mt-5 bg-primary text-secondary py-3 px-6 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-colors w-max shadow-md border border-white/10">
                        Redeem Points
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RewardSection;
