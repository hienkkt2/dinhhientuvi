
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gold/10 bg-black/40 backdrop-blur-md py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="space-y-6">
          <h4 className="text-2xl font-royal text-gold font-black uppercase tracking-widest">Tử Vi Huyền Không</h4>
          <p className="text-indigo-200/40 text-sm leading-relaxed font-light">
            Chúng tôi kết hợp tri thức cổ truyền phương Đông với công nghệ phân tích hiện đại để mang đến cái nhìn sâu sắc nhất về vận mệnh con người.
          </p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">f</span>
            <span className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">t</span>
            <span className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">i</span>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black text-gold/60 uppercase tracking-[0.3em]">Dịch Vụ</h4>
          <ul className="space-y-3 text-indigo-100/60 text-sm">
            <li className="hover:text-gold cursor-pointer transition-colors">Luận giải tử vi trọn đời</li>
            <li className="hover:text-gold cursor-pointer transition-colors">Dự báo vận hạn 2026</li>
            <li className="hover:text-gold cursor-pointer transition-colors">Xem ngày tốt xấu</li>
            <li className="hover:text-gold cursor-pointer transition-colors">Tư vấn phong thủy</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black text-gold/60 uppercase tracking-[0.3em]">Hỗ Trợ</h4>
          <ul className="space-y-3 text-indigo-100/60 text-sm">
            <li>Email: hotro@tuvihuyenkhong.vn</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gold/5 text-center">
        <p className="text-[10px] text-indigo-300/20 uppercase tracking-[0.5em]">
          &copy; 2026 Tử Vi Huyền Không. Bảo lưu mọi quyền.
        </p>
      </div>

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"></div>
    </footer>
  );
};

export default Footer;
