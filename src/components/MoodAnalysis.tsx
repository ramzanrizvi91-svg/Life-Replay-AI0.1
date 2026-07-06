import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Smile, 
  Frown, 
  Meh, 
  Zap, 
  Sparkles, 
  Heart,
  TrendingUp,
  Brain
} from 'lucide-react';
import { MoodData } from '../types';

interface MoodAnalysisProps {
  moodTrends: MoodData[];
}

export default function MoodAnalysis({ moodTrends }: MoodAnalysisProps) {
  
  // Calculate average scores
  const avgHappiness = Math.round(moodTrends.reduce((acc, curr) => acc + curr.happinessScore, 0) / moodTrends.length);
  const avgStress = Math.round(moodTrends.reduce((acc, curr) => acc + curr.stressLevel, 0) / moodTrends.length);
  const avgEnergy = Math.round(moodTrends.reduce((acc, curr) => acc + curr.energyLevel, 0) / moodTrends.length);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Smile className="w-5 h-5 text-indigo-500" />
          <span>Biometric & Mood Dynamics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor neural emotional indicators synchronized from voice pitch analysis, screen-dwell pacing, and heartbeat wearables.
        </p>
      </div>

      {/* Grid of quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-5 rounded-[24px] glass-card relative overflow-hidden">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Overall Happiness</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{avgHappiness}%</div>
          <p className="text-[10px] text-emerald-500 mt-1 font-mono font-bold">Stable • Minimal Volatility</p>
        </div>

        <div className="p-5 rounded-[24px] glass-card relative overflow-hidden">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Average Stress Index</span>
            <Brain className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{avgStress}%</div>
          <p className="text-[10px] text-emerald-500 mt-1 font-mono font-bold">Low • Peak stress at 5 PM</p>
        </div>

        <div className="p-5 rounded-[24px] glass-card relative overflow-hidden">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Vaporized Energy Level</span>
            <Zap className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{avgEnergy}%</div>
          <p className="text-[10px] text-amber-500 mt-1 font-mono font-bold">Medium-High • Mid-day lull</p>
        </div>

      </div>

      {/* Hourly emoji mood timeline */}
      <div className="p-5 rounded-[24px] glass-card">
        <div className="pb-4 border-b border-slate-100 dark:border-white/5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Emoji Emotional Timeline</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Time-logged cognitive expression patterns</p>
        </div>

        <div className="flex justify-between items-center gap-2 overflow-x-auto py-6 px-4">
          {moodTrends.map((point, index) => (
            <div key={index} className="flex flex-col items-center gap-2 shrink-0 min-w-[50px] text-center">
              <span className="text-2xl hover:scale-125 transition-transform duration-200 cursor-help" title={point.label}>
                {point.emoji}
              </span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">{point.time.split(' ')[0]}</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono">{point.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stress & Energy Chart Area */}
      <div className="p-6 rounded-[24px] glass-card">
        <div className="pb-4 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Stress Level vs Energy Wave</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Comparing emotional tension and task physical capacity</p>
          </div>
          <div className="flex gap-4 text-[10px] font-mono font-bold">
            <span className="flex items-center gap-1 text-purple-500">
              <span className="w-2.5 h-1 bg-purple-500 opacity-20"></span>
              STRESS COEFFICIENT
            </span>
            <span className="flex items-center gap-1 text-[#00E5FF]">
              <span className="w-2.5 h-1 bg-[#00E5FF] opacity-20"></span>
              ENERGY COEFFICIENT
            </span>
          </div>
        </div>

        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodTrends} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderRadius: '12px', 
                  borderColor: '#1E293B',
                  color: '#F8FAFC'
                }} 
              />
              <Area type="monotone" dataKey="stressLevel" stroke="#A855F7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStress)" />
              <Area type="monotone" dataKey="energyLevel" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/60 text-xs text-slate-500 leading-relaxed flex gap-3">
          <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300">💡 Mood Pattern Synthesis:</span>{' '}
            Your stress indicator peaked at <span className="font-bold text-purple-600 dark:text-purple-400">5:00 PM</span> (55%) during successive team code reviews. Excellent mitigation occurred immediately after 6:00 PM when we began the aerobic workout, returning cortisol counts back down to a baseline of 15 points.
          </div>
        </div>
      </div>
    </div>
  );
}
