import { 
  LayoutDashboard, 
  Clock, 
  Sparkles, 
  CalendarDays, 
  Brain, 
  Smile, 
  BarChart3, 
  Settings, 
  PenSquare, 
  User, 
  LogOut,
  Command,
  Sun,
  Moon,
  Search,
  Bell
} from 'lucide-react';
import FocusTimer from './FocusTimer';
import { TimelineEvent } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  openCommandPalette: () => void;
  userEmail: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  onboardingStep: number;
  onAddTimelineEvent?: (event: TimelineEvent) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  openCommandPalette,
  userEmail,
  isLoggedIn,
  onLogout,
  onboardingStep,
  onAddTimelineEvent
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timeline', label: 'Replay Timeline', icon: Clock, badge: 'NEW' },
    { id: 'screenshots', label: 'Screenshots', icon: LayoutDashboard, category: 'analysis' }, // we can use it as a custom screen capture gallery
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'planner', label: 'Tomorrow Planner', icon: CalendarDays },
    { id: 'future-self', label: 'Future Self', icon: Brain, badge: 'AI' },
    { id: 'mood', label: 'Mood Analysis', icon: Smile },
    { id: 'productivity', label: 'Productivity', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar Grid', icon: CalendarDays },
    { id: 'notes', label: 'AI Notes', icon: PenSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200/40 dark:border-white/5 bg-white/30 dark:bg-black/30 backdrop-blur-2xl flex flex-col h-screen sticky top-0 shrink-0 select-none transition-colors duration-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200/40 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Life Replay <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 font-extrabold">AI</span>
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">v1.0.4 • Active Sync</p>
          </div>
        </div>
      </div>

      {/* Global Command / Search Trigger */}
      <div className="px-4 pt-4">
        <button 
          onClick={openCommandPalette}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 transition-all text-xs font-medium cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search or command...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded shadow-xs text-slate-500">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded shadow-xs text-slate-500">K</kbd>
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-2 font-mono">Navigation</div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-slate-900/5 dark:bg-white/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/10 dark:border-white/10 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-white/40 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  item.badge === 'AI' 
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-xs' 
                    : 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pomodoro Focus Timer Widget */}
      <div className="px-4 py-3 border-t border-slate-200/30 dark:border-white/5 bg-slate-50/20 dark:bg-black/10">
        <FocusTimer onAddTimelineEvent={onAddTimelineEvent} />
      </div>

      {/* Theme and Quick Actions Footer */}
      <div className="p-4 border-t border-slate-200/40 dark:border-white/5 bg-white/20 dark:bg-white/2 space-y-4">
        {/* Onboarding Banner if not completed */}
        {onboardingStep < 4 && (
          <div className="p-3 rounded-xl bg-gradient-to-tr from-[#6C63FF]/20 to-[#00E5FF]/20 border border-indigo-500/20 text-xs">
            <div className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span>Complete Onboarding</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Meet your AI avatar and sync credentials.</p>
            <button 
              onClick={() => setActiveTab('onboarding')}
              className="mt-2 w-full text-center py-1 rounded bg-indigo-500 text-white text-[10px] font-bold hover:bg-indigo-600 cursor-pointer transition-all"
            >
              Resume ({onboardingStep + 1}/4)
            </button>
          </div>
        )}

        {/* Theme and Notifications Row */}
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-mono">System Appearance</span>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Active Profile Info */}
        {isLoggedIn ? (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-inner uppercase shrink-0">
                {userEmail ? userEmail.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                  {userEmail.split('@')[0]}
                </div>
                <div className="text-[9px] text-emerald-500 dark:text-emerald-400 font-mono flex items-center gap-1 leading-none mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active AI Sync
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('login')}
            className="w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/15 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <User className="w-4 h-4" />
            <span>Connect Account</span>
          </button>
        )}
      </div>
    </aside>
  );
}
