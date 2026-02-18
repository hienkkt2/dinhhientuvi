
import React, { useState, useEffect } from 'react';

// Added text and icon properties to the Activity interface to match actual data structure
interface Activity {
  id: number;
  name: string;
  action: 'view' | 'unlock' | 'payment';
  time: string;
  amount?: string;
  text: string;
  icon: string;
}

const MOCK_NAMES = [
  "Nguyễn V* H*", "Trần T* M*", "Lê Th* H*", "Phạm H* A*", "Hoàng M* K*", 
  "Đỗ T* Q*", "Bùi Th* L*", "Phan V* T*", "Vũ M* Đ*", "Đặng T* N*"
];

// Renamed 'type' to 'action' and used 'as const' to ensure type compatibility with Activity interface
const ACTIONS = [
  { action: 'view' as const, text: 'vừa khai lập Mệnh Thư', icon: '❂' },
  { action: 'unlock' as const, text: 'vừa mở khóa Bí Pháp Cải Vận', icon: '🔓' },
  { action: 'payment' as const, text: 'đã thanh toán phí Premium thành công', icon: '💰', amount: '19.000đ' }
];

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Correctly initialize activities with objects matching the Activity interface
    const initial = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() - i * 10000,
      name: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
      ...ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      time: `${Math.floor(Math.random() * 10) + 1} phút trước`
    }));
    // Fixed casting to Activity[] after ensuring all required properties are present
    setActivities(initial as Activity[]);

    // Update randomly to simulate live feed
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        name: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
        ...ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
        time: 'Vừa xong'
      };
      // Fixed casting to Activity after ensuring all required properties are present
      setActivities(prev => [newActivity as Activity, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 mb-12 animate-fade-in">
      <div className="glass-panel rounded-2xl p-4 overflow-hidden relative border-gold/10 bg-white/[0.02]">
        <div className="absolute top-0 left-0 w-1 h-full bg-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
        
        <div className="flex items-center gap-4 mb-3 border-b border-gold/5 pb-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Hoạt Động Nhân Duyên Thời Gian Thực</h3>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div key={act.id} className="flex items-center justify-between text-[11px] md:text-xs animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="text-gold opacity-60">{act.icon}</span>
                <span className="text-white font-bold">{act.name}</span>
                <span className="text-white/40 italic">{act.text}</span>
                {act.amount && (
                  <span className="bg-gold/10 text-gold-bright px-1.5 py-0.5 rounded text-[9px] font-black border border-gold/20">
                    +{act.amount}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-white/20 uppercase font-medium">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
