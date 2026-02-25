import { ChevronRight, ShoppingBag } from 'lucide-react';

const accessories = [
    { id: 1, name: "Type 2 Cable", price: "199,000 MMK", imgColor: "bg-blue-100", label: "Best Seller" },
    { id: 2, name: "Portable Charger", price: "299,000 MMK", imgColor: "bg-green-100", label: "New" },
    { id: 3, name: "Wall Connector", price: "450,000 MMK", imgColor: "bg-gray-100", label: "Premium" },
];

const EVAccessories = () => {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-primary">EV Accessories</h2>
                <button className="text-sm font-bold text-ev-primary hover:text-ev-primary/80 transition-colors flex items-center pr-2">
                    Shop All <ChevronRight size={16} className="ml-0.5 relative top-[1px]" />
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory pl-2 -ml-2 pr-2 hide-scrollbar">
                {accessories.map((item) => (
                    <div
                        key={item.id}
                        className="min-w-[140px] bg-white rounded-3xl p-3 shadow-sm border border-gray-100 snap-start flex flex-col group relative overflow-hidden"
                    >
                        {/* Label */}
                        <div className="absolute top-3 left-3 z-10">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white bg-primary shadow-sm
                ${item.label === 'New' ? 'bg-accent text-primary' : 'bg-primary'}
              `}>
                                {item.label}
                            </span>
                        </div>

                        {/* Simulated Image Placeholder */}
                        <div className={`h-32 rounded-2xl ${item.imgColor} w-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-500`}>
                            <ShoppingBag size={40} className="text-black/10" />
                        </div>

                        <h3 className="font-bold text-sm text-primary leading-tight line-clamp-2 min-h-[40px]">{item.name}</h3>
                        <p className="font-black text-lg mt-1 text-ev-primary">{item.price}</p>

                        <button className="mt-3 bg-gray-50 text-primary py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EVAccessories;
