import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Bed,
  User,
  ChevronRight,
  BatteryCharging
} from 'lucide-react';

const PlugTypeIcon = ({ type, colorClass = "text-ev-primary" }) => {
  // Simple representation of plug types as requested in the design
  switch (type) {
    case 'AC GBT':
      return (
        <svg viewBox="0 0 24 24" className={`w-12 h-12 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="6" width="12" height="12" rx="4" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
        </svg>
      );
    case 'AC Type 2':
      return (
        <svg viewBox="0 0 24 24" className={`w-12 h-12 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      );
    case 'DC GBT':
      return (
        <svg viewBox="0 0 24 24" className={`w-12 h-12 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="7" y="5" width="10" height="14" rx="3" />
          <circle cx="10" cy="8" r="1" fill="currentColor" />
          <circle cx="14" cy="8" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="10" cy="14" r="1" fill="currentColor" />
          <circle cx="14" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      );
    case 'DC CCS2':
      return (
        <svg viewBox="0 0 24 24" className={`w-12 h-12 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="9" r="1.5" fill="currentColor" />
          <circle cx="14" cy="9" r="1.5" fill="currentColor" />
          <rect x="9" y="13" width="6" height="3" rx="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return <Zap size={48} className={colorClass} />;
  }
};

const EVFilterScreen = () => {
  const navigate = useNavigate();
  const [selectedPlug, setSelectedPlug] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const services = [
    { label: 'Self Charge', Icon: BatteryCharging },
    { label: 'Accessories', Icon: ShoppingBag }
  ];

  const toggleService = (label) => {
    setSelectedServices(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const plugTypes = ['AC GBT', 'AC Type 2', 'DC GBT', 'DC CCS2'];


  // Calculate mocked result counts based on selection
  const getResultCount = () => {
    let count = 235; // Base count
    if (selectedPlug) count -= 40;
    count -= (selectedServices.length * 15);
    return Math.max(0, count);
  };

  const handleShowResults = (viewType) => {
    const targetPath = viewType === 'list' ? '/station-list' : '/explore';
    navigate(targetPath, {
      state: {
        plug: selectedPlug,
        services: selectedServices,
        view: viewType
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen bg-white pb-40 pt-4">
      {/* Header */}
      <header className="flex items-center px-4 py-2 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-primary pr-8">EV Charging Selection</h1>
      </header>

      <main className="p-4 space-y-6">
        {/* Results Button moved to top */}
        <button
          onClick={() => handleShowResults('list')}
          className="w-full bg-white text-primary py-5 px-6 rounded-2xl font-bold shadow-lg flex flex-row items-center justify-between leading-none active:scale-[0.98] transition-all border border-ev-primary mb-8 group"
        >
          <span className="text-lg">Charging Stations</span>
          <div className="bg-ev-primary/10 p-2 rounded-full text-ev-primary group-active:scale-95 transition-transform">
            <BatteryCharging size={20} />
          </div>
        </button>

        {/* Plug Type Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-4 px-1">Plug Type</h2>
          <div className="grid grid-cols-2 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {plugTypes.map((type, index) => (
              <button
                key={type}
                onClick={() => setSelectedPlug(type === selectedPlug ? null : type)}
                className={`flex flex-col items-center justify-center p-4 border-gray-100 border-b-2 border-b-ev-primary transition-all ${index % 2 === 0 ? 'border-r' : ''
                  } ${selectedPlug === type ? 'bg-ev-primary/10 ring-2 ring-inset ring-ev-primary' : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="mb-3">
                  <PlugTypeIcon type={type} colorClass={selectedPlug === type ? 'text-ev-primary' : 'text-gray-400'} />
                </div>
                <span className={`text-[10px] font-bold uppercase ${selectedPlug === type ? 'text-ev-primary' : 'text-gray-500'}`}>{type}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Available Service Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-4 px-1">Available Service</h2>
          <div className="grid grid-cols-2 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {services.map((service, index) => (
              <button
                key={service.label}
                onClick={() => {
                  if (service.label === 'Accessories') {
                    navigate('/explore');
                  } else if (service.label === 'Self Charge') {
                    navigate('/station-list');
                  } else {
                    toggleService(service.label);
                  }
                }}
                className={`flex flex-col items-center justify-center p-4 border-gray-100 border-b-2 border-b-ev-primary transition-all ${index % 2 === 0 ? 'border-r' : ''
                  } ${selectedServices.includes(service.label) ? 'bg-ev-primary/10 ring-2 ring-inset ring-ev-primary' : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="mb-3">
                  <service.Icon size={40} className={selectedServices.includes(service.label) ? 'text-ev-primary' : 'text-gray-400'} />
                </div>
                <span className={`text-[10px] font-bold uppercase ${selectedServices.includes(service.label) ? 'text-ev-primary' : 'text-gray-500'}`}>{service.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

export default EVFilterScreen;
