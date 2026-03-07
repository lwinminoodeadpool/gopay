import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  ShoppingBag,
  ChevronRight,
  BatteryCharging,
  CircleDollarSign
} from 'lucide-react';

const PlugTypeIcon = ({ type, colorClass = 'text-ev-primary' }) => {
  switch (type) {
    case 'AC GBT':
      return (
        <svg viewBox="0 0 24 24" className={`w-10 h-10 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className={`w-10 h-10 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className={`w-10 h-10 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className={`w-10 h-10 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="9" r="1.5" fill="currentColor" />
          <circle cx="14" cy="9" r="1.5" fill="currentColor" />
          <rect x="9" y="13" width="6" height="3" rx="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return <Zap size={40} className={colorClass} />;
  }
};

/* Unique color palette per plug type */
const plugColorMap = {
  'AC GBT': { bg: 'bg-blue-50', border: 'border-blue-500', iconOn: 'text-blue-600', iconOff: 'text-blue-500', label: 'text-blue-600', dot: 'bg-blue-500' },
  'AC Type 2': { bg: 'bg-emerald-50', border: 'border-emerald-500', iconOn: 'text-emerald-600', iconOff: 'text-emerald-500', label: 'text-emerald-600', dot: 'bg-emerald-500' },
  'DC GBT': { bg: 'bg-orange-50', border: 'border-orange-500', iconOn: 'text-orange-600', iconOff: 'text-orange-500', label: 'text-orange-600', dot: 'bg-orange-500' },
  'DC CCS2': { bg: 'bg-purple-50', border: 'border-purple-500', iconOn: 'text-purple-600', iconOff: 'text-purple-500', label: 'text-purple-600', dot: 'bg-purple-500' },
};

/* Unique color palette per service */
const serviceColorMap = {
  'Self Charge': { bg: 'bg-teal-50', border: 'border-teal-500', iconOn: 'text-teal-600', iconOff: 'text-teal-500', label: 'text-teal-600', dot: 'bg-teal-500' },
  'Accessories': { bg: 'bg-rose-50', border: 'border-rose-500', iconOn: 'text-rose-600', iconOff: 'text-rose-500', label: 'text-rose-600', dot: 'bg-rose-500' },
};

const EVFilterScreen = () => {
  const navigate = useNavigate();
  const [selectedPlug, setSelectedPlug] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { label: 'Self Charge', Icon: BatteryCharging },
    { label: 'Accessories', Icon: ShoppingBag },
  ];

  const toggleService = (label) => {
    setSelectedServices(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const plugTypes = ['AC GBT', 'AC Type 2', 'DC GBT', 'DC CCS2'];

  const handleShowResults = (viewType) => {
    const targetPath = viewType === 'list' ? '/station-list' : '/explore';
    navigate(targetPath, {
      state: { plug: selectedPlug, services: selectedServices, view: viewType },
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen bg-background-soft pb-40">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-50 border-b border-gray-50 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary border border-gray-100 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-primary tracking-tight">EV Charging</h1>
      </header>

      <main className="p-4 flex flex-col gap-5">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-primary font-black text-lg leading-tight">Find a Station</h2>
              <p className="text-gray-400 text-xs font-semibold mt-0.5">Browse all nearby EV chargers</p>
            </div>
            <div className="bg-ev-primary/10 p-3 rounded-2xl">
              <BatteryCharging size={28} className="text-ev-primary" />
            </div>
          </div>

          {/* Pricing Info */}
          <div className="flex items-center gap-2 bg-[#F8F9FA] rounded-2xl p-3 mb-4 border border-gray-50">
            <CircleDollarSign size={18} className="text-ev-primary flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Starting Rate</p>
              <p className="text-ev-primary font-black text-sm">1,500 MMK / kWh</p>
            </div>
          </div>

          {/* Show All Stations Button */}
          <button
            onClick={() => handleShowResults('list')}
            className="w-full bg-ev-primary text-secondary py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-ev-primary/20 active:scale-95 transition-all"
          >
            <BatteryCharging size={18} />
            View Charging Stations
            <ChevronRight size={16} />
          </button>

          {/* KBZPay Payment Button */}
          <button className="w-full mt-3 bg-[#0055A6] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
            <div className="px-2 py-0.5 bg-white text-[#0055A6] rounded text-xs italic font-black">KBZPay</div>
            Pay with KBZPay
          </button>
        </div>

        {/* Plug Type Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-black text-primary mb-1 uppercase tracking-tight">Plug Type</h2>
          <p className="text-gray-400 text-xs font-semibold mb-4">Select your vehicle's connector</p>
          <div className="grid grid-cols-2 gap-3">
            {plugTypes.map((type) => {
              const isSelected = selectedPlug === type;
              const c = plugColorMap[type];
              return (
                <button
                  key={type}
                  onClick={() => setSelectedPlug(type === selectedPlug ? null : type)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all active:scale-95 ${isSelected
                    ? `${c.bg} ${c.border}`
                    : 'bg-[#F8F9FA] border-transparent hover:border-gray-200'
                    }`}
                >
                  <div className="mb-3">
                    <PlugTypeIcon type={type} colorClass={isSelected ? c.iconOn : c.iconOff} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${isSelected ? c.label : 'text-gray-500'}`}>
                    {type}
                  </span>
                  {isSelected && <div className={`mt-2 w-4 h-1 ${c.dot} rounded-full`} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Available Service Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-black text-primary mb-1 uppercase tracking-tight">Available Service</h2>
          <p className="text-gray-400 text-xs font-semibold mb-4">Filter by service type</p>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.label);
              const c = serviceColorMap[service.label];
              return (
                <button
                  key={service.label}
                  onClick={() => {
                    if (service.label === 'Accessories') navigate('/explore');
                    else if (service.label === 'Self Charge') navigate('/station-list');
                    else toggleService(service.label);
                  }}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all active:scale-95 ${isSelected
                    ? `${c.bg} ${c.border}`
                    : 'bg-[#F8F9FA] border-transparent hover:border-gray-200'
                    }`}
                >
                  <div className="mb-3">
                    <service.Icon size={40} className={isSelected ? c.iconOn : c.iconOff} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${isSelected ? c.label : 'text-gray-500'}`}>
                    {service.label}
                  </span>
                  {isSelected && <div className={`mt-2 w-4 h-1 ${c.dot} rounded-full`} />}
                </button>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
};

export default EVFilterScreen;
