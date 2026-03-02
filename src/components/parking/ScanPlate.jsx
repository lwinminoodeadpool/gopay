import { useState, useEffect } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

const ScanPlate = ({ carNumber, onNext }) => {
    const [scanned, setScanned] = useState(false);
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        setScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            setScanning(false);
            setScanned(true);
            // Auto navigate after success
            setTimeout(() => {
                onNext();
            }, 1500);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center pt-32 px-4 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-black text-primary mb-2">Scan License Plate</h2>
            <p className="text-sm text-gray-500 mb-8 text-center">Position your camera to scan the license plate before entering.</p>

            <div className="relative w-full aspect-square max-w-sm">
                {/* Mock Camera Viewfinder */}
                <div className="absolute inset-0 bg-gray-900 rounded-3xl overflow-hidden flex items-center justify-center">
                    {!scanned && (
                        <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-2xl relative flex items-center justify-center">
                            {scanning && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-accent/80 animate-[scan_2s_ease-in-out_infinite]"
                                    style={{ boxShadow: '0 0 10px 2px rgba(250, 204, 21, 0.5)' }}></div>
                            )}
                            <p className="text-white/50 font-mono text-sm">Align plate here</p>

                            {/* Target plate matching passed data */}
                            <div className="absolute bottom-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg">
                                <p className="text-white font-mono font-bold tracking-widest">{carNumber}</p>
                            </div>
                        </div>
                    )}

                    {scanned && (
                        <div className="flex flex-col items-center justify-center animate-in zoom-in duration-300">
                            <CheckCircle size={64} className="text-status-success mb-4" />
                            <p className="text-white font-bold text-lg">Scan Successful</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 w-full flex items-center justify-center pt-4 pb-8">
                {!scanned && (
                    <button
                        onClick={handleScan}
                        disabled={scanning}
                        className={`flex items-center justify-center gap-2 w-full max-w-xs py-4 rounded-xl font-bold text-white transition-all shadow-md
                            ${scanning ? 'bg-gray-800' : 'bg-ev-primary hover:bg-teal-700'}`}
                    >
                        <Camera size={20} />
                        {scanning ? 'Scanning...' : 'Tap to Scan'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ScanPlate;
