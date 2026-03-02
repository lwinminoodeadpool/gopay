import { useState } from 'react';
import { Clock } from 'lucide-react';

const TimeSelection = ({ onNext }) => {
    const [selectedHours, setSelectedHours] = useState(1);
    const hourlyRate = 1500; // MMK

    const totalFee = selectedHours * hourlyRate;

    const timeOptions = [
        { hours: 1, label: '1 Hour' },
        { hours: 2, label: '2 Hours' },
        { hours: 3, label: '3 Hours' },
        { hours: 4, label: '4 Hours' },
        { hours: 5, label: '5 Hours' },
        { hours: 8, label: 'All Day (8h)' },
    ];

    return (
        <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-black text-primary mb-2">Select Duration</h2>
            <p className="text-sm text-gray-500 mb-6">How long do you plan to park?</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
                {timeOptions.map((option) => (
                    <button
                        key={option.hours}
                        onClick={() => setSelectedHours(option.hours)}
                        className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1
                            ${selectedHours === option.hours
                                ? 'border-accent bg-accent/5 text-primary shadow-sm'
                                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                    >
                        <Clock size={20} className={selectedHours === option.hours ? 'text-accent' : ''} />
                        <span className="font-bold">{option.label}</span>
                    </button>
                ))}
            </div>

            <div className="bg-primary text-secondary rounded-3xl p-6 shadow-xl mb-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>

                <h3 className="text-sm text-secondary/70 mb-1 relative z-10">Estimated Fee</h3>
                <div className="flex items-end gap-2 relative z-10">
                    <span className="text-4xl font-black text-accent">{totalFee.toLocaleString()}</span>
                    <span className="text-sm text-secondary/70 pb-1">MMK</span>
                </div>
                <p className="text-xs text-secondary/50 mt-2 relative z-10">Rate: {hourlyRate.toLocaleString()} MMK / hr</p>
            </div>

            <button
                onClick={() => onNext({ duration: selectedHours, fee: totalFee })}
                className="w-full bg-ev-primary text-white py-4 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors"
            >
                Continue to Scan
            </button>
        </div>
    );
};

export default TimeSelection;
