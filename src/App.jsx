import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const triggerRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Move car further (to 95vw) and trail together
      tl.to(carRef.current, { x: "95vw", ease: "none" }, 0);
      tl.to(trailRef.current, { width: "100%", ease: "none" }, 0);

      // Stat boxes fade in
      tl.to(".stat-box", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out" 
      }, 0.1);

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-zinc-200 overflow-hidden">
      <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">
        
        {/* ROAD SECTION */}
        <div className="relative w-full h-[20vh] bg-[#1a1a1a] flex items-center overflow-hidden shadow-2xl">
          
          {/* Layer 1: Hidden Text (Same color as background #1a1a1a) */}
          <h1 className="absolute w-full text-center text-[8vw] font-black text-[#1a1a1a] leading-none whitespace-nowrap z-0 select-none uppercase">
            WELCOME ITZFIZZ
          </h1>

          {/* Layer 2: Green Trail + White Text (The Reveal) */}
          <div 
            ref={trailRef}
            className="absolute h-full bg-[#22c55e] z-10 w-0 overflow-hidden flex items-center"
          >
            <h1 className="absolute w-screen text-center text-[8vw] font-black text-white leading-none whitespace-nowrap select-none uppercase">
              WELCOME ITZFIZZ
            </h1>
          </div>

          {/* Layer 3: The Car (Larger and Centered) */}
          <div 
            ref={carRef} 
            className="absolute left-0 z-30 h-[60vh] w-[500px] flex items-center justify-center -translate-x-1/2"
          >
            <img 
              src="/car-top.png" 
              // rotate-90 or rotate-0 depending on your image orientation
              className="h-full w-full object-contain rotate-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]" 
              alt="car"
            />
          </div>
        </div>

        {/* STAT BOXES */}
        <div className="absolute inset-0 pointer-events-none z-40">
            <StatCard p="58%" d="Increase in pick up point use" col="bg-[#d9f99d]" pos="top-[10%] left-[50%]" />
            <StatCard p="27%" d="Increase in pick up point use" col="bg-zinc-800 text-white" pos="top-[10%] left-[78%]" />
            <StatCard p="23%" d="Decreased in customer calls" col="bg-[#7dd3fc]" pos="bottom-[10%] left-[45%]" />
            <StatCard p="40%" d="Decreased in customer calls" col="bg-[#fb923c]" pos="bottom-[10%] left-[78%]" />
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ p, d, col, pos }) => (
  <div className={`stat-box opacity-0 translate-y-12 absolute ${pos} ${col} p-6 rounded-2xl shadow-xl w-64 border border-black/5`}>
    <h3 className="text-5xl font-black mb-1">{p}</h3>
    <p className="text-[10px] font-bold leading-tight uppercase tracking-tighter">{d}</p>
  </div>
);

export default App;