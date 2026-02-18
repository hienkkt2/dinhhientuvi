
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative pt-12 pb-8 px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block mb-4">
            <span className="block h-px w-12 bg-gold mx-auto mb-2 opacity-50"></span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60 font-medium">Khai Mở Thiên Cơ</span>
            <span className="block h-px w-12 bg-gold mx-auto mt-2 opacity-50"></span>
        </div>
        <h1 className="text-5xl md:text-7xl font-royal font-extrabold tracking-tighter mb-4">
            <span className="text-gold">TỬ VI</span>
            <span className="mx-4 text-white/90">HUYỀN KHÔNG</span>
        </h1>
        <p className="text-indigo-200/60 font-light tracking-[0.2em] uppercase text-[10px] md:text-xs">
            Hệ Thống Luận Giải Mệnh Lý Cao Cấp • 2026 Bính Ngọ
        </p>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>
    </header>
  );
};

export default Header;
