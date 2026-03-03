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

const PlugTypeIcon = ({ type }) => {
  // Simple representation of plug types as requested in the design
  switch (type) {
    case 'AC GBT':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-ev-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-ev-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-ev-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-ev-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="9" r="1.5" fill="currentColor" />
          <circle cx="14" cy="9" r="1.5" fill="currentColor" />
          <rect x="9" y="13" width="6" height="3" rx="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return <Zap size={48} className="text-ev-primary" />;
  }
};

const EVFilterScreen = () => {
  const navigate = useNavigate();
  const [selectedPlug, setSelectedPlug] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const plugTypes = ['AC GBT', 'AC Type 2', 'DC GBT', 'DC CCS2'];
  const services = [
    { id: 'self', name: 'Self Charge', icon: <BatteryCharging size={24} /> },
    { id: 'restaurant', name: 'Restaurant', icon: <UtensilsCrossed size={24} /> },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBag size={24} /> },
    { id: 'hotel', name: 'Hotel', icon: <Bed size={24} /> }
  ];

  const regions = [
    { id: 'highway', name: 'အမြန်လမ်း', label: 'Highway' },
    { id: 'yangon', name: 'ရန်ကုန်', label: 'Yangon' },
    { id: 'mandalay', name: 'မန္တလေး', label: 'Mandalay' },
    { id: 'naypyidaw', name: 'နေပြည်တော်', label: 'Nay Pyi Taw' },
    { id: 'bago', name: 'ပဲခူး', label: 'Bago' },
    { id: 'ayeyarwaddy', name: 'ဧရာဝတီ', label: 'Ayeyarwaddy' },
    { id: 'mon', name: 'မွန်', label: 'Mon' },
    { id: 'shan', name: 'ရှမ်း', label: 'Shan' },
    { id: 'magway', name: 'မကွေး', label: 'Magway' },
    { id: 'sagaing', name: 'စစ်ကိုင်း', label: 'Sagaing' },
    { id: 'tanintharyi', name: 'တနင်္သာရီ', label: 'Tanintharyi' },
    { id: 'rakhine', name: 'ရခိုင်', label: 'Rakhine' },
    { id: 'kachin', name: 'ကချင်', label: 'Kachin' },
    { id: 'kayah', name: 'ကယား', label: 'Kayah' },
    { id: 'kayin', name: 'ကရင်', label: 'Kayin' },
    { id: 'chin', name: 'ချင်း', label: 'Chin' }
  ];

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Calculate mocked result counts based on selection
  const getResultCount = () => {
    let count = 235; // Base count
    if (selectedPlug) count -= 40;
    if (selectedServices.length > 0) count -= (selectedServices.length * 25);
    if (selectedRegion) {
      // Different counts for different regions to make it feel "connected"
      const regionCounts = {
        highway: 42, yangon: 128, mandalay: 64, naypyidaw: 32,
        bago: 18, ayeyarwaddy: 12, mon: 8, shan: 15,
        magway: 9, sagaing: 11, tanintharyi: 6, rakhine: 4,
        kachin: 5, kayah: 3, kayin: 7, chin: 2
      };
      count = regionCounts[selectedRegion] || 5;
    }
    return Math.max(0, count);
  };

  const handleShowResults = (viewType) => {
    const targetPath = viewType === 'list' ? '/station-list' : '/explore';
    navigate(targetPath, {
      state: {
        plug: selectedPlug,
        services: selectedServices,
        region: selectedRegion,
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

      <main className="p-4 space-y-8">
        {/* Plug Type Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-4 px-1">Plug Type</h2>
          <div className="grid grid-cols-4 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {plugTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPlug(type === selectedPlug ? null : type)}
                className={`flex flex-col items-center justify-center p-4 border-r last:border-r-0 border-gray-100 transition-all ${selectedPlug === type ? 'bg-ev-primary/10 ring-2 ring-inset ring-ev-primary' : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="mb-3">
                  <PlugTypeIcon type={type} />
                </div>
                <span className={`text-[10px] font-bold uppercase ${selectedPlug === type ? 'text-ev-primary' : 'text-gray-500'}`}>{type}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Available Services Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-4 px-1">Available Services</h2>
          <div className="grid grid-cols-4 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`flex flex-col items-center justify-center p-4 border-r last:border-r-0 border-gray-100 transition-all ${selectedServices.includes(service.id) ? 'bg-ev-primary/10 ring-2 ring-inset ring-ev-primary' : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className={`mb-3 ${selectedServices.includes(service.id) ? 'text-ev-primary' : 'text-gray-400'}`}>
                  {service.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase text-center leading-tight ${selectedServices.includes(service.id) ? 'text-ev-primary' : 'text-gray-500'}`}>
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* States & Divisions Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-4 px-1">
            States & Divisions (ပြည်နယ်နှင့်တိုင်း)
          </h2>
          <div className="grid grid-cols-4 border-t border-l border-gray-100">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
                className={`h-20 flex items-center justify-center border-r border-b border-gray-100 p-2 text-center transition-all ${selectedRegion === region.id
                  ? 'bg-ev-primary text-white font-bold shadow-lg shadow-ev-primary/20 z-10'
                  : 'bg-white text-gray-700 font-medium hover:bg-gray-50'
                  }`}
              >
                <span className="text-sm leading-tight">
                  {region.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 pb-6 z-[60]">
        <div className="flex gap-4">
          <button
            onClick={() => handleShowResults('map')}
            className="flex-1 bg-gradient-to-br from-[#4ade80] to-[#0d9488] text-white py-4 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all shadow-emerald-500/20"
          >
            Show Map ({getResultCount()})
          </button>
          <button
            onClick={() => handleShowResults('list')}
            className="flex-1 bg-gradient-to-br from-[#4ade80] to-[#0d9488] text-white py-4 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all shadow-emerald-500/20"
          >
            Show List ({getResultCount()})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EVFilterScreen;
