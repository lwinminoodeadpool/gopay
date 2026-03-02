import { CheckCircle } from 'lucide-react';

const Payment = ({ details, onComplete }) => {
    return (
        <div className="pt-8 px-4 flex flex-col items-center h-full animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-status-success/10 text-status-success rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
            </div>

            <h2 className="text-2xl font-black text-primary mb-2">Session Ended</h2>
            <p className="text-gray-500 mb-8 max-w-xs text-center">Your parking session has been completed successfully.</p>

            <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-8">
                <h3 className="font-bold text-primary mb-4 pb-4 border-b border-gray-100">Receipt Summary</h3>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Plate Number</span>
                        <span className="font-bold text-primary font-mono">{details.carNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-bold text-primary">{details.duration} {details.duration === 1 ? 'Hour' : 'Hours'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location</span>
                        <span className="font-bold text-primary">Downtown Plaza</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-500 font-medium">Total Amount</span>
                    <span className="text-2xl font-black text-accent">{details.fee?.toLocaleString()} MMK</span>
                </div>
            </div>

            <div className="w-full space-y-3 mt-auto mb-6">
                <button
                    onClick={onComplete}
                    className="w-full bg-status-success text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                    {/* Mock KBZPay Logo representation */}
                    <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-black italic mr-1">KBZPay</span>
                    Pay {details.fee?.toLocaleString()} MMK
                </button>
                <button
                    onClick={onComplete}
                    className="w-full text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Payment;
