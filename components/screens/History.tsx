import React from 'react';
import { HistoryEvent } from '../../types';
import { Button } from '../Button';
import { Home, Share2 } from 'lucide-react';

interface HistoryViewProps {
  events: HistoryEvent[];
  onBackHome: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ events, onBackHome }) => {
  // Sort events newest first for display, or oldest first? 
  // Timeline usually flows down, so oldest at top is better for narrative.
  // Let's use oldest at top.
  const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);

  const handleShare = () => {
    // Generate a readable story string
    const story = sortedEvents.map((e, i) => {
      const date = new Date(e.timestamp).toLocaleDateString('zh-HK');
      if (i === 0) return `【旅程開始】${date}\n由 ${e.fromName} 開始傳遞給 ${e.toName}。`;
      return `【第 ${i + 1} 站】${date}\n${e.fromName} 交給了 ${e.toName}\n原因：${e.promptText}`;
    }).join('\n\n');

    const finalText = `🐘 大象女士的旅程記錄 (ID: #8841)\n\n${story}`;

    navigator.clipboard.writeText(finalText).then(() => {
        // In a real app we would use a toast, here simple alert is fine or just UI feedback
        alert('旅程記錄已複製到剪貼簿！');
    }).catch(err => {
        console.error('Failed to copy', err);
    });
  };

  return (
    <div className="flex flex-col min-h-screen py-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold text-stone-800">鎖匙扣經歷</h2>
        <div className="flex items-center gap-2">
            <span className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded-full">
            {events.length} stations
            </span>
            <button 
                onClick={handleShare}
                className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
                title="複製記錄"
            >
                <Share2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="relative pl-4 space-y-8 pb-12">
        {/* Continuous vertical line */}
        <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-stone-200" />

        {sortedEvents.map((event, index) => {
          const isLast = index === sortedEvents.length - 1;
          
          // Format Date
          const date = new Date(event.timestamp).toLocaleDateString('zh-HK', { month: 'short', day: 'numeric' });

          return (
            <div key={event.id} className="relative flex items-start group">
              {/* Timeline Dot */}
              <div className={`
                absolute left-0 top-1 w-14 h-14 rounded-full border-4 border-stone-50 
                flex items-center justify-center z-10 transition-colors duration-300
                ${isLast ? 'bg-stone-800 text-white shadow-lg' : 'bg-white text-stone-400 shadow-sm'}
              `}>
                <span className="font-bold text-lg">
                  {event.toName.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Content Card */}
              <div className="ml-20 bg-white p-5 rounded-2xl shadow-sm border border-stone-100 w-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-stone-400 font-medium block uppercase tracking-wide">Holder</span>
                    <h3 className={`font-bold text-lg ${isLast ? 'text-stone-900' : 'text-stone-600'}`}>
                      {event.toName}
                    </h3>
                  </div>
                  <span className="text-xs text-stone-300 bg-stone-50 px-2 py-1 rounded">
                    {date}
                  </span>
                </div>

                {/* Connection Info */}
                {index > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <p className="text-sm text-stone-500">
                      來自 <span className="font-medium text-stone-700">{event.fromName}</span>
                    </p>
                    <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-800 text-xs rounded-md font-medium">
                      <span>因為：{event.promptText}</span>
                    </div>
                  </div>
                )}
                
                {/* Initial Seed Handling */}
                {index === 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <p className="text-xs text-stone-400 italic">旅程起點</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto px-4 pb-8">
         <Button onClick={onBackHome} variant="outline" fullWidth className="bg-white">
           <Home className="w-4 h-4 mr-2" />
           返回首頁
         </Button>
      </div>
    </div>
  );
};