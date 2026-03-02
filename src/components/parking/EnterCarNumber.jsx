import { useState } from 'react';
import { Car } from 'lucide-react';

const EnterCarNumber = ({ onNext }) => {
    const [carNumber, setCarNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (carNumber.trim()) {
            onNext({ carNumber });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full pt-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full max-w-xs text-center">
                <div className="w-16 h-16 bg-ev-primary/10 text-ev-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Car size={32} />
                </div>

                <h2 className="text-xl font-black text-primary mb-2">Enter Car Number</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your plate number to check parking availability.</p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={carNumber}
                            onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                            placeholder="e.g. 9S/1234"
                            className="w-full text-center text-2xl font-mono font-bold py-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-accent focus:outline-none transition-colors uppercase placeholder:text-gray-300 placeholder:font-sans"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!carNumber.trim()}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md
                            ${carNumber.trim() ? 'bg-ev-primary hover:bg-teal-700' : 'bg-gray-300'}`}
                    >
                        Check Status
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnterCarNumber;
