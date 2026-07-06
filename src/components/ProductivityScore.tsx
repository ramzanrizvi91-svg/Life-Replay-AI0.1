import { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Brain, 
  Sliders,
  Calendar,
  Layers,
  Activity,
  Coffee
} from 'lucide-react';

interface ProductivityScoreProps {
  scoreBreakdown: {
    focus: number;
    health: number;
    meetings: number;
    learning: number;
    sleep: number;
  };
  onUpdateBreakdown: (key: string, val: number) => void;
}

export default function ProductivityScore({
  scoreBreakdown,
  onUpdateBreakdown
}: ProductivityScoreProps) {
  // Compute overall score dynamically based on state weights
  const [weights, setWeights] = useState({
    focus: 0.35,
    health: 0.20,
    meetings: 0.15,
    learning: 0.15,
    sleep: 0.15
  });

  const overallScore = Math.round(
    scoreBreakdown.focus * weights.focus +
    scoreBreakdown.health * weights.health +
    scoreBreakdown.meetings * weights.meetings +
    scoreBreakdown.learning * weights.learning +
    scoreBreakdown.sleep * weights.sleep
  );

  // SVG Circular progress radius helper
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500 animate-bounce" />
          <span>Productivity Weighting Engine</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure customized weights for focus, recovery, meetings, and sleep. Watch your overall index adjust dynamically in real time.
        </p>
      </div>

      {/* Main Scoring row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Large Circular Gauge */}
        <div className="md:col-span-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-6 flex flex-col items-center justify-center relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Underlayer grey track */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-900"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Glowing underglow */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-indigo-500/20 dark:stroke-indigo-500/10 blur-[4px]"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
              {/* Active animated track */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-gradient stroke-indigo-500"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
              />
            </svg>

            {/* Absolute Centered text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                {overallScore}%
              </span>
              <span className="text-[10px] font-bold font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mt-1">
                OVERALL SCORE
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Consistency Quotient: Excellent</span>
            <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px]">
              You maintained an 85%+ score for 4 consecutive work days.
            </p>
          </div>
        </div>

        {/* Adjustments & breakdown sliders */}
        <div className="md:col-span-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 p-6 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200/50 dark:border-slate-800/60">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span>Calibrate Category Scores</span>
            </h3>
            <span className="text-[10px] font-mono text-indigo-500">MANUAL RE-ALIGNMENT</span>
          </div>

          <div className="space-y-4">
            
            {/* Slider Focus */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold"><Brain className="w-3.5 h-3.5 text-indigo-500" /> Focus Quality</span>
                <span className="font-mono font-bold text-indigo-500">{scoreBreakdown.focus}% (weight: {weights.focus * 100}%)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scoreBreakdown.focus} 
                onChange={(e) => onUpdateBreakdown('focus', parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Slider Health */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold"><Activity className="w-3.5 h-3.5 text-emerald-500" /> Physiological Health</span>
                <span className="font-mono font-bold text-emerald-500">{scoreBreakdown.health}% (weight: {weights.health * 100}%)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scoreBreakdown.health} 
                onChange={(e) => onUpdateBreakdown('health', parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Slider Meetings */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> Meeting Management</span>
                <span className="font-mono font-bold text-cyan-500">{scoreBreakdown.meetings}% (weight: {weights.meetings * 100}%)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scoreBreakdown.meetings} 
                onChange={(e) => onUpdateBreakdown('meetings', parseInt(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Slider Sleep */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold"><Coffee className="w-3.5 h-3.5 text-purple-400" /> Sleep Recovery</span>
                <span className="font-mono font-bold text-purple-500">{scoreBreakdown.sleep}% (weight: {weights.sleep * 100}%)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scoreBreakdown.sleep} 
                onChange={(e) => onUpdateBreakdown('sleep', parseInt(e.target.value))}
                className="w-full accent-purple-400"
              />
            </div>

            {/* Slider Learning */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold"><Layers className="w-3.5 h-3.5 text-amber-500" /> Learning & Refactoring</span>
                <span className="font-mono font-bold text-amber-500">{scoreBreakdown.learning}% (weight: {weights.learning * 100}%)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scoreBreakdown.learning} 
                onChange={(e) => onUpdateBreakdown('learning', parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Cognitive Tips list */}
      <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex gap-4 items-start">
        <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl shrink-0 animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Calibration Insight:</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Since your Focus Quality accounts for <span className="font-semibold text-indigo-500">35%</span> of your total calculated productivity, any distraction during deep blocks has a severe downstream impact on your overall index. Consider locking focus block parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
