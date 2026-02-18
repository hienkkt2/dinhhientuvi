
import React from 'react';
import { HoroscopeData, HouseInfo } from '../types';

interface Props {
  data: HoroscopeData;
}

const House: React.FC<{ house: HouseInfo; positionClass: string }> = ({ house, positionClass }) => {
  return (
    <div className={`border border-gold/10 p-3 md:p-4 text-[10px] md:text-xs flex flex-col h-full laso-cell transition-all duration-500 hover:z-20 hover:border-gold/50 hover:bg-gold/[0.03] group ${positionClass}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/30 text-gold-bright px-2.5 py-1 font-black rounded-lg shadow-lg text-[8px] md:text-[9px] uppercase tracking-widest group-hover:scale-110 transition-transform">
          {house.name}
        </span>
        <span className="text-gold/30 font-serif italic text-[9px] group-hover:text-gold/60 transition-colors">{house.element}</span>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex flex-col gap-2">
          {house.stars.main.map(s => (
            <div key={s} className="star-main text-[11px] md:text-[14px] leading-tight flex items-center gap-1.5 transition-all group-hover:translate-x-1">
              <span className="text-[7px] text-gold/40">❂</span>
              {s}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 mt-3 pt-3 border-t border-gold/5">
          {house.stars.sub.map((s, idx) => (
            <span key={idx} className={`${idx % 2 === 0 ? 'star-good' : 'star-neutral'} text-[9px] md:text-[11px] opacity-70 group-hover:opacity-100 transition-opacity`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-3 text-right opacity-10 group-hover:opacity-30 transition-opacity">
         <span className="text-[7px] font-serif uppercase tracking-[0.3em] font-black">{house.name}</span>
      </div>
    </div>
  );
};

const BirthChart: React.FC<Props> = ({ data }) => {
  const h = data.houses;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-6xl font-royal text-gold mb-5 text-center italic font-black">Tiên Thiên Mệnh Đồ</h2>
        <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative glass-panel rounded-3xl overflow-hidden border-2 border-gold/30 shadow-[0_0_100px_rgba(0,0,0,0.8)] p-1">
            <div className="grid grid-cols-4 grid-rows-4 gap-0 aspect-square lg:aspect-square max-w-full">
                {/* Row 1 */}
                <House house={h[3]} positionClass="border-r border-b" />
                <House house={h[4]} positionClass="border-r border-b" />
                <House house={h[5]} positionClass="border-r border-b" />
                <House house={h[6]} positionClass="border-b" />

                {/* Center Panel */}
                <House house={h[2]} positionClass="border-r border-b" />
                <div className="col-span-2 row-span-2 bg-[#02020a] flex flex-col items-center justify-center p-8 text-center border-r border-b relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circle-knot.png')] bg-center bg-no-repeat bg-contain pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gold/[0.02] group-hover:bg-gold/[0.05] transition-colors"></div>
                    
                    <div className="relative z-10 w-full max-w-xs">
                        <div className="text-gold font-royal text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase border-b border-gold/10 pb-6 group-hover:tracking-normal transition-all duration-500">
                            {data.userInfo.fullName}
                        </div>
                        <div className="space-y-5 text-sm md:text-base">
                            <div className="flex justify-between items-center border-b border-gold/5 pb-2.5">
                                <span className="text-gold/30 text-[9px] uppercase tracking-widest font-black">Niên Mệnh Can Chi</span>
                                <span className="text-white font-bold">{data.canChiYear.full}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gold/5 pb-2.5">
                                <span className="text-gold/30 text-[9px] uppercase tracking-widest font-black">Ngũ Hành Bản Mệnh</span>
                                <span className="text-gold-bright font-black drop-shadow-sm">{data.element}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gold/30 text-[9px] uppercase tracking-widest font-black">Thời Kỳ Soi Chiếu</span>
                                <span className="text-white font-bold">2026 - Bính Ngọ</span>
                            </div>
                        </div>
                        
                        <div className="mt-12">
                            <div className="inline-flex items-center gap-3 px-6 py-2.5 border border-gold/20 rounded-full bg-gold/5 text-gold text-[8px] uppercase tracking-[0.4em] font-black group-hover:bg-gold/10 group-hover:border-gold/40 transition-all">
                                <span className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]"></span>
                                Mệnh Thư Đang Kích Hoạt
                            </div>
                        </div>
                    </div>
                </div>
                <House house={h[7]} positionClass="border-b" />

                <House house={h[1]} positionClass="border-r border-b" />
                <House house={h[8]} positionClass="border-b" />

                {/* Row 4 */}
                <House house={h[0]} positionClass="border-r" />
                <House house={h[11]} positionClass="border-r" />
                <House house={h[10]} positionClass="border-r" />
                <House house={h[9]} positionClass="" />
            </div>
        </div>
      </div>
      
      <div className="mt-16 flex flex-col items-center opacity-30 group">
        <div className="text-[10px] tracking-[0.6em] uppercase text-gold mb-3 font-black group-hover:tracking-[0.8em] transition-all duration-500">Huyền Không Mệnh Lý</div>
        <div className="text-[8px] text-indigo-200 uppercase tracking-widest">Bảo mật đa tầng • Kết nối linh giới v3.2</div>
      </div>
    </div>
  );
};

export default BirthChart;
