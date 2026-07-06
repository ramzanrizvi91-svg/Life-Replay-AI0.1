import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  LineChart, 
  Line,
  CartesianGrid
} from 'recharts';
import { 
  Clock, 
  Zap, 
  TrendingDown, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface TimeWasteAnalysisProps {
  avgFocusScore: number;
}

export default function TimeWasteAnalysis({
  avgFocusScore
}: TimeWasteAnalysisProps) {
  
  // 1. Focus vs Distraction Pie Data
  const focusPieData = [
    { name: 'Deep Focus Work', value: 3.8, color: '#6C63FF' },
    { name: 'Collaborative Meetings', value: 1.4, color: '#00E5FF' },
    { name: 'Mindful Breaks & Rest', value: 1.2, color: '#4ADE80' },
    { name: 'Active Distractions', value: 0.75, color: '#EF4444' }
  ];

  // 2. App usage bar data
  const appUsageData = [
    { name: 'VS Code', minutes: 228, color: '#6C63FF' },
    { name: 'Figma', minutes: 84, color: '#00E5FF' },
    { name: 'Chrome', minutes: 75, color: '#EF4444' },
    { name: 'Terminal', minutes: 60, color: '#FBBF24' },
    { name: 'Meet/Zoom', minutes: 45, color: '#4ADE80' }
  ];

  // 3. Energy Levels line data
  const energyFlowData = [
    { time: '8:00 AM', energy: 85, focus: 80 },
    { time: '10:00 AM', energy: 95, focus: 96 },
    { time: '12:00 PM', energy: 75, focus: 60 },
    { time: '2:00 PM', energy: 80, focus: 90 },
    { time: '4:00 PM', energy: 78, focus: 85 },
    { time: '6:00 PM', energy: 95, focus: 40 },
    { time: '8:00 PM', energy: 65, focus: 30 }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction text */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          <span>Cognitive Load & Time Waste Analytics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Visual graphs tracking energy peaks, digital distractions, and application distribution metrics compiled over 24 hours.
        </p>
      </div>

      {/* Primary Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Primary Time Leak</span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" />
            <span>Twitter & YouTube</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">Estimated distraction: <span className="font-bold text-rose-500 font-mono">45 mins</span></p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Peak Efficiency window</span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
            <span>10:30 AM - 12:00 PM</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">Focus metric hit: <span className="font-bold text-indigo-500 font-mono">96% score</span></p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Max Focus Duration</span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>105 Minutes Block</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">Average depth: <span className="font-bold text-emerald-500 font-mono">High stability</span></p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Retrieved Time Potential</span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6C63FF]" />
            <span>32m Saved Tomorrow</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">By optimizing mid-day breaks</p>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart Card: Focus vs Distraction */}
        <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cognitive Focus Distribution</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Focus vs rest breakdown in active hours</p>
          </div>

          <div className="h-64 flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {focusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderRadius: '12px', 
                    borderColor: '#1E293B',
                    color: '#F8FAFC'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Color Keys list */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-100 dark:border-slate-900 font-medium">
            {focusPieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">{item.name} ({item.value}h)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Card: Time Spent per App */}
        <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Screentime per Application</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Total minutes captured in major system windows</p>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appUsageData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} unit="m" />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(108, 99, 255, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    borderRadius: '12px', 
                    borderColor: '#1E293B',
                    color: '#F8FAFC'
                  }} 
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {appUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-[10px] text-center font-mono text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-900 uppercase">
            Chrome accounts for 80% of identified distractions.
          </div>
        </div>

      </div>

      {/* Energy Level Flow chart (Line Chart) */}
      <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Circadian Rhythm & Energy Flow</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Correlation between physiological energy and focus performance</p>
          </div>
          <div className="flex gap-4 text-[10px] font-mono font-bold">
            <span className="flex items-center gap-1 text-[#6C63FF]">
              <span className="w-2.5 h-0.5 bg-[#6C63FF]"></span>
              FOCUS QUALITY
            </span>
            <span className="flex items-center gap-1 text-[#00E5FF]">
              <span className="w-2.5 h-0.5 bg-[#00E5FF]"></span>
              ENERGY METRICS
            </span>
          </div>
        </div>

        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyFlowData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} tickLine={false} domain={[0, 100]} />
              <RechartsTooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderRadius: '12px', 
                  borderColor: '#1E293B',
                  color: '#F8FAFC'
                }} 
              />
              <Line type="monotone" dataKey="focus" stroke="#6C63FF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="energy" stroke="#00E5FF" strokeWidth={2.5} strokeDasharray="3 3" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI description underneath the graph */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/60 text-xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-700 dark:text-slate-300">💡 Replay Correlation Analysis:</span>{' '}
          Your physical energy was peak at <span className="font-bold text-[#6C63FF]">10:00 AM</span> (95 points), aligning perfectly with our 96% peak deep focus coding block. The mid-day drop is normal circadian flatline. Short walking intervals help bridge this gap before returning to focus.
        </div>
      </div>

    </div>
  );
}
