
import React, { useState } from 'react';

interface Props {
  onUnlock: () => void;
  sessionId: string;
}

const Paywall: React.FC<Props> = ({ onUnlock, sessionId }) => {
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFakePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUnlock();
    }, 2500);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STB|8396869395|19000|MOKHOA_TUVI_${sessionId}`;

  return (
    <div className="max-w-3xl mx-auto my-20 p-1 md:p-1.5 bg-gradient-to-br from-gold/50 via-gold/10 to-gold/50 rounded-[2rem] shadow-2xl relative">
      <div className="glass-panel p-10 md:p-14 rounded-[1.9rem] text-center overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.75-7 9.82-3.87-1.07-7-5.15-7-9.82V6.3l7-3.12z"/></svg>
        </div>
        
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Dịch Vụ Cao Cấp
            </div>
            
            <h3 className="text-4xl md:text-5xl font-royal text-gold font-extrabold mb-6 leading-tight">
                Mở Khóa <br/> Bản Mệnh Toàn Thư
            </h3>
            
            <p className="text-indigo-100/70 mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                Nhận ngay bản luận giải chuyên sâu <span className="text-white font-bold underline decoration-gold/50">hơn 15,000 chữ</span> từ các bậc thầy tử vi. Thấu hiểu vận hạn năm <span className="text-gold font-bold">2026 Bính Ngọ</span> và định hướng tương lai trọn đời.
            </p>

            {!showQR ? (
              <button 
                onClick={() => setShowQR(true)}
                className="btn-gold py-5 px-12 rounded-2xl text-lg tracking-widest uppercase transition-all"
              >
                Khai Mở Ngay • 19.000đ
              </button>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-2xl relative border-4 border-gold/20">
                      <img src={qrUrl} alt="QR Payment" className="w-48 h-48 md:w-64 md:h-64" />
                    </div>
                </div>
                
                <div className="max-w-md mx-auto grid grid-cols-1 gap-4 text-left bg-black/40 p-8 rounded-3xl border border-gold/10 backdrop-blur-md shadow-inner">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gold/60 text-xs uppercase tracking-widest font-bold">Ngân hàng</span>
                    <span className="text-white font-medium">Techcombank (TCB)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gold/60 text-xs uppercase tracking-widest font-bold">Số tài khoản</span>
                    <span className="text-white font-bold text-lg">8396869395</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gold/60 text-xs uppercase tracking-widest font-bold">Chủ tài khoản</span>
                    <span className="text-white font-medium uppercase">ĐOÀN VĂN HIỂN</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gold/60 text-xs uppercase tracking-widest font-bold">Nội dung</span>
                    <code className="bg-gold/10 text-gold-bright px-3 py-1 rounded-lg text-xs font-black border border-gold/20">MOKHOA_TUVI_{sessionId}</code>
                  </div>
                </div>

                <div className="pt-4">
                    <button 
                      onClick={handleFakePayment}
                      disabled={loading}
                      className={`w-full max-w-md py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl ${
                        loading 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-500 text-white hover:scale-105'
                      }`}
                    >
                      {loading ? 'Đang Kiểm Tra Giao Dịch...' : 'Xác Nhận Đã Thanh Toán'}
                    </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-indigo-300/40 text-[10px] font-medium uppercase tracking-widest">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 18c-3.87-1.07-7-5.15-7-9.82V6.3l7-3.12 7 3.12v4.7c0 4.67-3.13 8.75-7 9.82z"/></svg>
                    Hệ thống bảo mật giao dịch tự động
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Paywall;
