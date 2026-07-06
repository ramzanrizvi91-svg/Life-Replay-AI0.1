import { 
  TrendingUp, 
  Smile, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Brain,
  Sparkles,
  RefreshCw,
  Clock
} from 'lucide-react';
import { TimelineEvent, ScreenshotItem, TaskItem, CalendarEvent } from '../types';
import DailyGoals from './DailyGoals';

interface DashboardOverviewProps {
  timeline: TimelineEvent[];
  screenshots: ScreenshotItem[];
  tasks: TaskItem[];
  calendar: CalendarEvent[];
  setActiveTab: (tab: string) => void;
  onRunAIAgent: () => void;
  isSyncing: boolean;
  scoreBreakdown: {
    focus: number;
    health: number;
    meetings: number;
    learning: number;
    sleep: number;
  };
}

export default function DashboardOverview({
  timeline,
  screenshots,
  tasks,
  calendar,
  setActiveTab,
  onRunAIAgent,
  isSyncing,
  scoreBreakdown
}: DashboardOverviewProps) {
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  
  // Calculate statistics
  const avgFocusScore = screenshots.length > 0
    ? Math.round(screenshots.reduce((acc, curr) => acc + curr.focusScore, 0) / screenshots.length)
    : 85;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#6C63FF]/5 to-[#00E5FF]/5 border border-indigo-500/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            <span>Active AI Observer Engine</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Welcome back, Creator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Life Replay finished analyzing today's metrics. Your overall focus rating is excellent, though we detected standard post-lunch fatigue.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto self-start md:self-center shrink-0">
          <button
            onClick={onRunAIAgent}
            disabled={isSyncing}
            className={`w-full md:w-auto px-5 py-3 md:px-4 md:py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isSyncing ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Analyzing Screentime...' : 'Re-Run Replay Scan'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Key Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Productivity Card */}
        <div className="p-6 rounded-[24px] glass-card glass-card-interactive flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Productivity Score</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">87%</span>
              <span className="text-xs font-semibold text-emerald-500 flex items-center font-mono">+3.2% vs yesterday</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Goal: 85%</span>
              <span>Focus Quality: High</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>

        {/* Mood Analysis Card */}
        <div className="p-6 rounded-[24px] glass-card glass-card-interactive flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Dominant Mood</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center">
                <Smile className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">😌 Calm</span>
              <span className="text-xs font-semibold text-slate-400 font-mono">Stress Level: 24%</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Weekly Mood Trend</span>
              <span className="text-emerald-500">Extremely Stable</span>
            </div>
            <div className="flex gap-1 h-3 items-end">
              <div className="w-full h-2 bg-indigo-500/30 rounded-xs"></div>
              <div className="w-full h-3 bg-indigo-500 rounded-xs"></div>
              <div className="w-full h-1.5 bg-indigo-500/20 rounded-xs"></div>
              <div className="w-full h-2.5 bg-indigo-500 rounded-xs"></div>
              <div className="w-full h-3 bg-indigo-500 rounded-xs"></div>
            </div>
          </div>
        </div>

        {/* Focus Hours Card */}
        <div className="p-6 rounded-[24px] glass-card glass-card-interactive flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Focus Blocks</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">5.2h</span>
              <span className="text-xs font-semibold text-rose-500 flex items-center font-mono">45m distracted</span>
            </div>
          </div>
          <div className="mt-6 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Deep Work Code:</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">3.8 hrs</span>
            </div>
            <div className="flex justify-between">
              <span>App-Switching Cost:</span>
              <span className="font-mono text-amber-500 font-semibold">32m</span>
            </div>
          </div>
        </div>

        {/* Sync Status Card */}
        <div className="p-6 rounded-[24px] glass-card glass-card-interactive flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Synced Metrics</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {timeline.length}
              </span>
              <span className="text-xs font-semibold text-slate-400 font-mono">8 timeline points</span>
            </div>
          </div>
          <div className="mt-6 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Screenshots Analyzed:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{screenshots.length} captured</span>
            </div>
            <div className="flex justify-between">
              <span>Tasks Progress:</span>
              <span className="font-mono text-emerald-500 font-semibold">{completedTasksCount}/{totalTasksCount} done</span>
            </div>
          </div>
        </div>

      </div>

      {/* Three-Column Midsection Bento Layout: Future Self Suggestion, Daily Goals & High Priority Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: AI Future Self Guidance Box */}
        <div className="lg:col-span-4 rounded-[24px] glass-card p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#6C63FF]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center relative">
                  <Brain className="w-4.5 h-4.5 text-indigo-500" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-xs leading-tight">Advice from Tomorrow</h3>
                  <p className="text-[9px] text-slate-400 font-mono">Future Self AI Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('future-self')}
                className="text-[10px] text-indigo-500 hover:text-indigo-600 font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                <span>Chat</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-4 py-1">
              <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-white/3 border border-slate-200/30 dark:border-white/5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                "Hey! I noticed you handled the morning design review flawlessly. Watch out at <span className="font-bold text-indigo-600 dark:text-indigo-400">1:45 PM</span>—you logged high distraction rates when switching tabs. Tomorrow, let's take a 10m walk post-lunch."
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 mt-4 border-t border-slate-200/50 dark:border-white/5">
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-50/50 dark:bg-white/1 border border-slate-100 dark:border-white/2">
                <div className="text-[8px] text-slate-400 uppercase font-mono">Focus</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{scoreBreakdown.focus}%</div>
              </div>
              <div className="p-2 rounded bg-slate-50/50 dark:bg-white/1 border border-slate-100 dark:border-white/2">
                <div className="text-[8px] text-slate-400 uppercase font-mono">Health</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{scoreBreakdown.health}%</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('planner')}
              className="w-full py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-all cursor-pointer text-center"
            >
              Optimize tomorrow's schedule
            </button>
          </div>
        </div>

        {/* Middle Column: Daily Milestones Tracking Component */}
        <div className="lg:col-span-4">
          <DailyGoals />
        </div>

        {/* Right Column: Key Alerts, Sync, and Active Warnings */}
        <div className="lg:col-span-4 rounded-[24px] glass-card p-6 flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/5">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Urgent Time Alerts</span>
              </h3>
              <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">2 Issues Identified</span>
            </div>

            <div className="mt-4 space-y-4">
              
              {/* Alert 1 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">App-Switching Fatigue</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    You generated <span className="font-bold text-slate-800 dark:text-slate-200">22 context switches</span> between VS Code & Chrome in 15 mins. Focus efficiency degraded by 34%.
                  </p>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Delayed Deep Focus Block</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Morning coding session was delayed by 20 minutes due to overrunning Scrum conversations.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Automatic Screenshot Monitor</span>
              <span className="text-emerald-500 flex items-center gap-1 font-mono font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                POLLING (5m)
              </span>
            </div>
            
            <button 
              onClick={() => setActiveTab('timeline')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Interactive Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Mini Calendar Draft Grid / Sync status preview */}
      <div className="p-6 rounded-[24px] glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Today's Calibrated Schedule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Synced with Google Calendar & Local Activity logs</p>
          </div>
          <button 
            onClick={() => setActiveTab('calendar')}
            className="text-xs text-indigo-500 hover:text-indigo-600 font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Open Calendar Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {calendar.slice(0, 4).map((event) => (
            <div 
              key={event.id}
              className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400">{event.time}</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">{event.title}</h4>
              </div>
              <div className="mt-3 text-[10px] text-indigo-500 dark:text-indigo-400 italic line-clamp-2 leading-relaxed">
                💡 {event.aiTip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
