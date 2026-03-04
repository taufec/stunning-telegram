import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F5F5] pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Headlines */}
      <div className="text-center z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-[#111111] leading-[0.9] uppercase">
          Homegrown Kedah<br />Tech Directory
        </h1>
        
        <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-light text-[#111111] mt-8 leading-tight">
          While they look south,<br />we build up north.
        </h2>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex -space-x-3">
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=11" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=12" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=13" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=14" alt="User" />
          </div>
          <span className="text-sm font-medium text-[#111111]">Join 1.8K+ others</span>
        </div>
      </div>

      {/* Curved Cards Slider */}
      <div className="relative w-full max-w-[1200px] mx-auto h-[300px] md:h-[450px] mt-16 flex justify-center items-center pointer-events-none">
        
        {/* Card 1 (Far Left) */}
        <div className="absolute w-40 md:w-64 aspect-[4/3] bg-[#222] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500"
             style={{ transform: 'translateX(-220%) translateY(100px) rotate(-25deg)' }}>
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,#444_4px,transparent_4px)] bg-[size:24px_24px] opacity-50" />
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#111] to-transparent">
             <div className="text-white text-xs font-medium">Resource Title Here</div>
           </div>
        </div>

        {/* Card 2 (Mid Left) */}
        <div className="absolute w-48 md:w-72 aspect-[4/3] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 z-10"
             style={{ transform: 'translateX(-110%) translateY(30px) rotate(-12deg)' }}>
           <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Pixelate Render" />
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-white text-xl md:text-2xl font-bold tracking-tight">Pixelate Render</span>
           </div>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#111] to-transparent">
             <div className="text-white text-xs font-medium">Resource Title Here</div>
           </div>
        </div>

        {/* Card 3 (Center) */}
        <div className="absolute w-56 md:w-[22rem] aspect-[4/3] bg-[#3E2723] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-20 transition-transform duration-500"
             style={{ transform: 'translateX(0) translateY(0) rotate(0deg)' }}>
           <div className="p-4 md:p-6 h-full flex flex-col">
             <div className="flex justify-between text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
               <span>Award</span>
               <span>Client</span>
               <span>Year</span>
             </div>
             <div className="flex flex-col gap-2 md:gap-3 text-[10px] md:text-xs text-white/80">
               <div className="flex justify-between"><span>Site of the Day</span><span>FlowFest</span><span>2025</span></div>
               <div className="flex justify-between bg-white/10 p-1.5 rounded"><span>Developer Award</span><span>FlowFest</span><span>2025</span></div>
               <div className="flex justify-between"><span>Product Honors</span><span>Osmo</span><span>2025</span></div>
               <div className="flex justify-between"><span>Site of the Day</span><span>Docusign Brand</span><span>2024</span></div>
             </div>
           </div>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1A1A1A]">
             <div className="text-white text-xs font-medium">Resource Title Here</div>
           </div>
        </div>

        {/* Card 4 (Mid Right) */}
        <div className="absolute w-48 md:w-72 aspect-[4/3] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 z-10"
             style={{ transform: 'translateX(110%) translateY(30px) rotate(12deg)' }}>
           <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="FX100" />
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-white text-xl md:text-2xl font-bold tracking-tight">FX100</span>
           </div>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#111] to-transparent">
             <div className="text-white text-xs font-medium">Resource Title Here</div>
           </div>
        </div>

        {/* Card 5 (Far Right) */}
        <div className="absolute w-40 md:w-64 aspect-[4/3] bg-[#33412A] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500"
             style={{ transform: 'translateX(220%) translateY(100px) rotate(25deg)' }}>
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#111] to-transparent">
             <div className="text-white text-xs font-medium">Resource Title Here</div>
           </div>
        </div>

      </div>

      {/* CTA Button */}
      <div className="mt-16 z-20">
        <Link 
          to="/submit"
          className="inline-block bg-[#00FF66] text-[#111111] font-black text-lg md:text-xl tracking-tight uppercase px-8 py-4 rounded-lg border-2 border-[#111111] shadow-[6px_6px_0px_0px_#111111] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#111111] transition-all"
        >
          Submit Your Startup
        </Link>
      </div>

    </section>
  );
};
