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
        <section className="mb-10 w-full overflow-hidden">
            <h2 className="text-lg font-bold text-primary mb-6 px-4 tracking-tight">Featured Highlights</h2>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory px-4 -mx-2 hide-scrollbar"
            >
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`w-[82vw] max-w-[320px] h-44 flex-shrink-0 snap-center rounded-[40px] overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] relative group bg-gradient-to-br from-[#0054A6] to-[#003A73] border border-blue-200/20 flex items-center justify-center transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,84,166,0.2)]`}
                    >
                        {/* Minimalist pattern overlay */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>

                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (!e.currentTarget.parentElement.querySelector('.fallback-text')) {
                                    const fallback = document.createElement('div');
                                    fallback.className = 'fallback-text absolute inset-0 flex items-center justify-center z-20 p-8 text-center';
                                    fallback.innerHTML = `<h3 class="text-white font-bold text-2xl leading-tight tracking-tight">${banner.title}</h3>`;
                                    e.currentTarget.parentElement.appendChild(fallback);
                                }
                            }}
                        />

                        {/* Glassmorphism gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10 opacity-70"></div>

                        {/* Title text overlaid */}
                        <div className="absolute bottom-6 left-7 right-7 z-20">
                            <h3 className="text-white font-bold text-lg leading-tight tracking-tight drop-shadow-md">{banner.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Pagination Indicators */}
            <div className="flex justify-center items-center gap-2 mt-2">
                {banners.map((_, i) => (
                    <div
                        key={i}
                        className={`transition-all duration-500 rounded-full ${activeIndex === i
                                ? 'w-8 h-1.5 bg-blue-600 shadow-[0_2px_10px_rgba(0,84,166,0.3)]'
                                : 'w-1.5 h-1.5 bg-slate-200'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default PromoBanners;
