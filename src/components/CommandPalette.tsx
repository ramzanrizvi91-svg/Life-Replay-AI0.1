import { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Settings, 
  LayoutDashboard, 
  Brain, 
  X,
  Keyboard
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onRunAIAgent: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  setActiveTab,
  onRunAIAgent
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  // Keyboard listener to open or close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Navigate to Dashboard', keywords: 'dashboard screen metrics overview home', tab: 'dashboard', icon: LayoutDashboard },
    { label: 'Explore Replay Timeline', keywords: 'timeline logs replay today hours events', tab: 'timeline', icon: Clock },
    { label: 'Run Automated Replay Scan', keywords: 'scan run ai capture screenshots', action: onRunAIAgent, icon: Sparkles },
    { label: 'Open Tomorrow Schedule Planner', keywords: 'planner tomorrow schedule agenda optimize blocks', tab: 'planner', icon: Clock },
    { label: 'Chat with Future Self AI', keywords: 'future self chat brain avatar coach advice', tab: 'future-self', icon: Brain },
    { label: 'Configure Core Preferences', keywords: 'settings settings preferences integrations privacy', tab: 'settings', icon: Settings },
  ];

  const filteredActions = actions.filter(act => 
    act.label.toLowerCase().includes(search.toLowerCase()) ||
    act.keywords.toLowerCase().includes(search.toLowerCase())
  );

  const handleActionClick = (act: typeof actions[0]) => {
    if (act.tab) {
      setActiveTab(act.tab);
    } else if (act.action) {
      act.action();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Search header box */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-900 flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands, screens, or actions..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-900 dark:text-white"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action item lists */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100/10">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase py-1 px-3">Available Commands</div>
          
          {filteredActions.length > 0 ? (
            filteredActions.map((act, index) => {
              const Icon = act.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleActionClick(act)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 text-left text-xs text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{act.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">⏎ EXECUTE</span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">No matching commands found.</div>
          )}
        </div>

        {/* Shortcuts reference footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1"><Keyboard className="w-4 h-4" /> Keyboard Commands</span>
          <div className="flex gap-2">
            <span>⌘K / Ctrl+K (Open Palette)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
