
import React, { useState } from 'react';

interface Props {
  interpretation: any;
  isPremium: boolean;
}

const InterpretationSection: React.FC<Props> = ({ interpretation, isPremium }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'houses' | 'cycles' | 'yearly'>('general');
  const [expandedHouse, setExpandedHouse] = useState<number | null>(null);

  if (!interpretation) return null;

  const tabs = [
    { id: 'general', label: 'Bình Tổng Quan' },
    { id: 'houses', label: 'Chi Tiết 12 Cung' },
    { id: 'cycles', label: 'Tiến Trình Đại Vận' },
    { id: 'yearly', label: 'Vận Hạn 2026' },
  ] as const;

  const paragraphs = interpretation.tongQuan.split('\n').filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      {/* Tab Navigation - Sáng và rõ hơn */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 bg-white/[0.08] p-2 rounded-2xl border border-gold/30 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl transition-all duration-500 font-black uppercase tracking-widest text-[12px] border ${
              activeTab === tab.id 
                ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' 
                : 'text-white/70 border-transparent hover:text-gold hover:border-gold/30 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {/* Tab 1: Bình Tổng Quan - Văn bản cực kỳ rõ nét */}
        {activeTab === 'general' && (
          <div className="glass-panel p-8 md:p-16 rounded-[3rem] animate-fade-in relative overflow-hidden border-gold/30 bg-gradient-to-b from-white/[0.05] to-transparent shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            
            <h3 className="text-4xl md:text-6xl font-royal text-gold mb-16 text-center uppercase tracking-tighter font-black italic drop-shadow-2xl">
              Định Mệnh Chân Kinh
            </h3>
            
            <div className="relative space-y-10">
              <div className="prose prose-invert max-w-none text-white leading-[2.2] text-lg md:text-2xl font-serif">
                {paragraphs.map((para: string, i: number) => {
                  const isLocked = !isPremium && i >= 2;
                  return (
                    <p 
                      key={i} 
                      className={`transition-all duration-1000 ${isLocked ? 'blur-2xl select-none opacity-10' : 'opacity-100 drop-shadow-md text-amber-50'} ${i === 0 ? 'first-letter:text-7xl first-letter:text-gold first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]' : ''}`}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>

              {!isPremium && (
                <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#03030b] via-[#03030b]/90 to-transparent flex flex-col items-center justify-end pb-10">
                  <div className="p-8 rounded-3xl bg-gold/10 border border-gold/20 backdrop-blur-md mb-8 text-center max-w-md">
                     <p className="text-gold font-bold uppercase tracking-widest text-[10px] mb-2">Thần cơ còn đang ẩn giấu</p>
                     <p className="text-white/60 text-sm italic">Hơn 1000 chữ bình giải chi tiết về hậu vận đang đợi bạn khai mở.</p>
                  </div>
                  <button 
                    onClick={() => document.getElementById('paywall')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-gold px-14 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(212,175,55,0.3)] animate-pulse"
                  >
                    Xem trọn bộ Định Mệnh
                  </button>
                </div>
              )}
            </div>
            
            {isPremium && (
              <div className="mt-20 p-12 bg-gradient-to-br from-gold/20 to-transparent rounded-[3rem] border border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-9xl opacity-5 pointer-events-none">❂</div>
                <h4 className="text-3xl font-royal text-gold mb-8 flex items-center gap-4 font-black uppercase tracking-widest">
                  <span className="text-5xl animate-spin-slow">❂</span> Bí Pháp Cải Vận
                </h4>
                <p className="text-white italic leading-loose text-xl font-serif drop-shadow-sm">{interpretation.loiKhuyen}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 12 Cung - Sáng bừng khi mở rộng */}
        {activeTab === 'houses' && (
          <div className="animate-fade-in space-y-12">
             <div className="text-center mb-16">
                <h3 className="text-4xl md:text-6xl font-royal text-gold uppercase font-black italic drop-shadow-xl">Luận Giải 12 Cung</h3>
                <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-6"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {interpretation.cacCung.map((cung: any, index: number) => {
                    const isLocked = !isPremium && index > 0;
                    const isExpanded = expandedHouse === index;
                    return (
                      <div key={index} className={`glass-panel rounded-[2.5rem] overflow-hidden transition-all duration-700 border-gold/20 ${isExpanded ? 'bg-white/[0.08] ring-2 ring-gold shadow-[0_0_60px_rgba(212,175,55,0.15)] scale-[1.03]' : 'hover:bg-white/[0.04] hover:border-gold/50'}`}>
                        <button 
                          onClick={() => setExpandedHouse(isExpanded ? null : index)}
                          className={`w-full p-10 flex justify-between items-center transition-all ${isExpanded ? 'bg-gold text-black' : ''}`}
                        >
                          <div className="flex flex-col items-start gap-1">
                             <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isExpanded ? 'text-black/60' : 'text-gold/50'}`}>Tầng Cung {index + 1}</span>
                             <span className={`text-2xl font-royal font-black uppercase tracking-widest ${isExpanded ? 'text-black' : 'text-white'}`}>Cung {cung.tenCung}</span>
                          </div>
                          <span className={`transition-transform duration-500 ${isExpanded ? 'rotate-180 scale-125' : 'text-gold'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7"></path></svg>
                          </span>
                        </button>
                        
                        {isExpanded && (
                          <div className={`p-10 relative bg-white/[0.02] ${isLocked ? 'min-h-[250px]' : ''}`}>
                            <div className={`prose prose-invert text-white leading-[2] font-serif text-lg md:text-xl ${isLocked ? 'blur-3xl opacity-10 select-none pointer-events-none' : 'opacity-100'}`}>
                               {cung.luanGiai.split('\n').map((p: string, i: number) => <p key={i} className="mb-6 drop-shadow-sm">{p}</p>)}
                            </div>
                            {isLocked && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl bg-black/20">
                                <div className="p-8 rounded-3xl bg-indigo-950/80 border border-gold/40 shadow-2xl">
                                    <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-6">Nội dung đã bị niêm phong</p>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); document.getElementById('paywall')?.scrollIntoView({behavior: 'smooth'}) }} 
                                        className="btn-gold px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg"
                                    >
                                        Mở Khóa Toàn Tập
                                    </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                 })}
             </div>
          </div>
        )}

        {/* Tab 3: Đại Vận - Sáng sủa và trực quan */}
        {activeTab === 'cycles' && (
          <div className="animate-fade-in relative">
             <h3 className="text-4xl md:text-6xl font-royal text-gold mb-20 text-center uppercase font-black italic drop-shadow-2xl">Tiến Trình Đại Vận</h3>
             
             {!isPremium ? (
                <div className="glass-panel p-20 rounded-[4rem] text-center border-gold/40 bg-white/[0.05] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                   <div className="text-7xl mb-10 animate-float">🔒</div>
                   <h4 className="text-3xl text-gold font-black mb-6 uppercase tracking-widest italic">Vận Trình 10 Năm Đang Đóng</h4>
                   <p className="text-white/60 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">Đại vận là cốt lõi của lá số, quyết định sự thành bại trong từng giai đoạn cuộc đời. Chỉ có thể xem trọn bộ tại bản Premium.</p>
                   <button 
                      onClick={() => document.getElementById('paywall')?.scrollIntoView({behavior: 'smooth'})}
                      className="btn-gold px-16 py-6 rounded-2xl text-sm font-black tracking-widest"
                   >
                      Mở Khóa Đại Vận Đời Người
                   </button>
                </div>
             ) : (
               <div className="grid lg:grid-cols-2 gap-10">
                  {interpretation.daiVan.map((dv: any, i: number) => (
                    <div key={i} className="glass-panel p-12 rounded-[3.5rem] border-l-[12px] border-gold bg-white/[0.06] hover:bg-white/[0.1] transition-all group shadow-xl">
                      <div className="flex items-center gap-6 mb-10">
                          <span className="bg-gold text-black px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.2em] shadow-lg">
                              Giai Đoạn {dv.giaiDoan} Tuổi
                          </span>
                          <div className="h-px flex-1 bg-gold/40"></div>
                      </div>
                      <p className="text-amber-50 leading-[2] italic text-xl font-serif drop-shadow-md">{dv.luanGiai}</p>
                    </div>
                  ))}
               </div>
             )}
          </div>
        )}

        {/* Tab 4: Tiểu Vận - Bản tin sáng bóng */}
        {activeTab === 'yearly' && (
          <div className="animate-fade-in">
             <div className="glass-panel p-10 md:p-24 rounded-[5rem] border-t-[16px] border-gold bg-gradient-to-b from-[#080816] to-[#02020a] relative overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.1)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <h3 className="text-4xl md:text-7xl font-royal text-gold mb-16 text-center uppercase font-black italic tracking-tighter drop-shadow-2xl">
                   Dự Báo <br className="md:hidden" /> 2026 Bính Ngọ
                </h3>
                
                <div className={`prose prose-invert max-w-none text-white leading-[2.4] text-xl md:text-2xl font-serif space-y-12 transition-all duration-1000 ${!isPremium ? 'blur-[40px] opacity-10 select-none' : 'opacity-100'}`}>
                    {interpretation.tieuVan2026.split('\n').map((p: string, i: number) => (
                        <p key={i} className="drop-shadow-md text-amber-50 p-6 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.06] transition-colors">{p}</p>
                    ))}
                </div>

                {!isPremium && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-black/40 backdrop-blur-2xl">
                      <div className="bg-[#0c0c25] p-16 md:p-24 rounded-[4rem] border-4 border-gold/50 shadow-[0_0_80px_rgba(212,175,55,0.3)] max-w-2xl text-center relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
                         <div className="text-8xl mb-12 animate-bounce">🔮</div>
                         <h4 className="text-4xl font-black text-gold mb-8 uppercase tracking-[0.1em] italic">Vận Hạn Năm Nay Đang Khóa</h4>
                         <p className="text-white/80 mb-14 text-xl leading-relaxed">Bản tin chi tiết về các tháng đại hạn, cung tài lộc và sức khỏe của bạn trong năm 2026 Bính Ngọ.</p>
                         <button 
                            onClick={() => document.getElementById('paywall')?.scrollIntoView({behavior: 'smooth'})}
                            className="btn-gold w-full py-8 rounded-3xl text-sm font-black uppercase tracking-[0.4em] shadow-2xl transition-all hover:tracking-[0.6em]"
                         >
                            Khai Thông Vận Mệnh 2026
                         </button>
                      </div>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterpretationSection;
