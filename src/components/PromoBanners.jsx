import React, { useState, useRef, useEffect } from 'react';

const PromoBanners = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Placeholder data representing the UI design (will be replaced by API call later)
    const banners = [
        { id: 1, image: '/assets/park_promo.png', title: '50% Off Parking Deals', color: 'from-ev-primary to-primary' },
        { id: 2, image: '/assets/weekend_deals.png', title: 'Weekend Super Deals', color: 'from-accent to-accent-dark' },
        { id: 3, image: '/assets/ev_cashback.png', title: 'Earn 10% EV Cashback', color: 'from-status-info to-primary' }
    ];

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        // Approximate width of one card + gap (85vw max 320px)
        const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
        const newIndex = Math.round(scrollPosition / cardWidth);
        // Ensure index is within bounds
        setActiveIndex(Math.min(Math.max(newIndex, 0), banners.length - 1));
    };

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollContainerRef.current) return;

            const maxIndex = banners.length - 1;
            const nextIndex = activeIndex === maxIndex ? 0 : activeIndex + 1;

            // Calculate approximate scroll distance
            const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
            // Add 16px (the gap) to the scroll calculation
            const scrollLeft = nextIndex === 0 ? 0 : nextIndex * (cardWidth + 16);

            scrollContainerRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });

            // Preemptively set active index for snappy UI updating
            setActiveIndex(nextIndex);
        }, 4000); // Slide every 4 seconds

        return () => clearInterval(interval);
    }, [activeIndex, banners.length]);

    return (
        <section className="mb-8 w-full overflow-hidden">
            <h2 className="text-xl font-bold text-primary mb-4 px-2">Featured Highlights</h2>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory px-4 -mx-2 hide-scrollbar"
            >
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`w-[85vw] max-w-[320px] h-40 flex-shrink-0 snap-center rounded-[2rem] overflow-hidden shadow-md relative group bg-gradient-to-br ${banner.color} border border-gray-100 flex items-center justify-center`}
                    >
                        {/* Fallback pattern if image is missing */}
                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>

                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                // Graceful fallback if image fails to load
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center z-20 p-6 text-center"><h3 class="text-white font-black text-2xl leading-none tracking-tight">${banner.title}</h3></div>`;
                            }}
                        />

                        {/* Soft overlay gradient to ensure text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 opacity-80 mix-blend-multiply"></div>

                        {/* Title text overlaid */}
                        <div className="absolute bottom-4 left-5 right-5 z-20">
                            <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">{banner.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-1.5 mt-3">
                {banners.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-ev-primary' : 'w-1.5 bg-gray-200'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default PromoBanners;
