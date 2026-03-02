import { useState } from 'react';
import EnterCarNumber from '../components/parking/EnterCarNumber';
import ParkingStatus from '../components/parking/ParkingStatus';
import TimeSelection from '../components/parking/TimeSelection';
import ScanPlate from '../components/parking/ScanPlate';
import ActiveSession from '../components/parking/ActiveSession';
import Payment from '../components/parking/Payment';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = {
    ENTER_PLATE: 1,
    STATUS: 2,
    TIME_SELECT: 3,
    SCAN: 4,
    ACTIVE: 5,
    PAYMENT: 6
};

const ParkingPage = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.ENTER_PLATE);
    const [parkingDetails, setParkingDetails] = useState({
        carNumber: '',
        duration: null,
        fee: null
    });

    const navigate = useNavigate();

    const handleBack = () => {
        if (currentStep === STEPS.ENTER_PLATE) {
            navigate('/');
        } else if (currentStep === STEPS.ACTIVE) {
            // Cannot go back simply during active session
            navigate('/');
        } else if (currentStep === STEPS.PAYMENT) {
            navigate('/');
        } else {
            setCurrentStep(prev => prev - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case STEPS.ENTER_PLATE:
                return <EnterCarNumber onNext={(data) => {
                    setParkingDetails(prev => ({ ...prev, ...data }));
                    setCurrentStep(STEPS.STATUS);
                }} />;

            case STEPS.STATUS:
                return <ParkingStatus
                    carNumber={parkingDetails.carNumber}
                    onNext={() => setCurrentStep(STEPS.TIME_SELECT)}
                />;

            case STEPS.TIME_SELECT:
                return <TimeSelection
                    onNext={(data) => {
                        setParkingDetails(prev => ({ ...prev, ...data }));
                        setCurrentStep(STEPS.SCAN);
                    }}
                />;

            case STEPS.SCAN:
                return <ScanPlate
                    carNumber={parkingDetails.carNumber}
                    onNext={() => setCurrentStep(STEPS.ACTIVE)}
                />;

            case STEPS.ACTIVE:
                return <ActiveSession
                    details={parkingDetails}
                    onEndSession={() => setCurrentStep(STEPS.PAYMENT)}
                />;

            case STEPS.PAYMENT:
                return <Payment
                    details={parkingDetails}
                    onComplete={() => navigate('/')}
                />;

            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-background-soft">
            {/* Header */}
            <header className="flex items-center p-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 h-16">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-primary absolute left-4 z-20"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="w-full flex justify-center absolute left-0 right-0 z-10">
                    <h1 className="text-lg font-black text-primary">Smart Parking</h1>
                </div>
            </header>

            {/* Step Indicators */}
            {currentStep < STEPS.ACTIVE && (
                <div className="flex px-6 py-4 bg-white justify-between items-center shadow-sm relative z-0">
                    <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-100 -z-10 translate-y-[-50%]"></div>
                    <div className="absolute top-1/2 left-10 h-1 bg-ev-primary transition-all duration-500 -z-10 translate-y-[-50%]"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%`, maxWidth: 'calc(100% - 5rem)' }}></div>

                    {[1, 2, 3, 4].map(step => (
                        <div
                            key={step}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                                ${currentStep > step ? 'bg-ev-primary text-white scale-95' :
                                    currentStep === step ? 'bg-primary text-secondary ring-4 ring-primary/20 scale-110' :
                                        'bg-white border-2 border-gray-200 text-gray-400'}`}
                        >
                            {step}
                        </div>
                    ))}
                </div>
            )}

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto pb-4">
                {renderStep()}
            </main>
        </div>
    );
};

export default ParkingPage;
