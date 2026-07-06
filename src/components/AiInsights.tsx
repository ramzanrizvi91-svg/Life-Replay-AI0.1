import { 
  Sparkles, 
  Layers, 
  Activity, 
  Clock, 
  TrendingUp, 
  Shuffle, 
  Video, 
  MapPin 
} from 'lucide-react';
import { InsightItem } from '../types';

interface AiInsightsProps {
  insights: InsightItem[];
}

export default function AiInsights({ insights }: AiInsightsProps) {
  
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('switching') || t.includes('app')) {
      return <Shuffle className="w-5 h-5 text-amber-500" />;
    }
    if (t.includes('focus') || t.includes('peak')) {
      return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    }
    if (t.includes('meeting')) {
      return <Video className="w-5 h-5 text-rose-500" />;
    }
    return <MapPin className="w-5 h-5 text-indigo-500" />;
  };

  const getBorderColor = (type: InsightItem['type']) => {
    switch (type) {
      case 'warning': return 'border-amber-500/20 dark:border-amber-500/10 hover:border-amber-500/40 bg-amber-500/5';
      case 'success': return 'border-emerald-500/20 dark:border-emerald-500/10 hover:border-emerald-500/40 bg-emerald-500/5';
      case 'alert': return 'border-rose-500/20 dark:border-rose-500/10 hover:border-rose-500/40 bg-rose-500/5';
      default: return 'border-indigo-500/20 dark:border-indigo-500/10 hover:border-indigo-500/40 bg-indigo-500/5';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-spin" />
          <span>Generative AI Cognitive Insights</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Deep behavioral insights synthesized by your local LLM model running on background screentime patterns.
        </p>
      </div>

      {/* Grid of Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex gap-4 items-start ${getBorderColor(insight.type)}`}
          >
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl shrink-0 shadow-inner border border-slate-200/40 dark:border-slate-800/60">
              {getIcon(insight.title)}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex justify-between items-baseline gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{insight.title}</h4>
                <span className="text-sm font-extrabold font-mono text-slate-800 dark:text-slate-200">{insight.value}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {insight.description}
              </p>
              
              <div className="pt-2 text-[10px] font-mono text-indigo-500 flex items-center gap-1">
                <span>⚡ AI-TRAINED RECOMMENDED ACTION AVAILABLE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Synthesis Report Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-xl border border-indigo-500/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Executive Cognitive Synthesis Report</span>
        </div>

        <h3 className="text-base font-bold tracking-tight mb-2">Cognitive Overload Risk: Low (Stable)</h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Based on 4 screenshot points and calendar synchronizations, your overall cognitive fatigue is tracking <span className="font-semibold text-emerald-400">14% lower</span> than the monthly median. Morning deep blocks were held for 105 consecutive minutes. Moving your post-lunch review slots to 4:00 PM is estimated to yield an additional 40 minutes of deep focus tomorrow.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Cognitive Depth</div>
            <div className="text-base font-bold mt-1 text-emerald-400">Excellent</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Switching Friction</div>
            <div className="text-base font-bold mt-1 text-amber-400">Moderate</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Meeting Fatigue</div>
            <div className="text-base font-bold mt-1 text-emerald-400">Low</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Weekly Consistency</div>
            <div className="text-base font-bold mt-1 text-indigo-400">89%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
