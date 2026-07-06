import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ReplayTimeline from './components/ReplayTimeline';
import ScreenshotGallery from './components/ScreenshotGallery';
import TimeWasteAnalysis from './components/TimeWasteAnalysis';
import AiInsights from './components/AiInsights';
import TomorrowPlanner from './components/TomorrowPlanner';
import FutureSelf from './components/FutureSelf';
import MoodAnalysis from './components/MoodAnalysis';
import ProductivityScore from './components/ProductivityScore';
import CalendarView from './components/CalendarView';
import NotesView from './components/NotesView';
import SettingsView from './components/SettingsView';
import LoginPage from './components/LoginPage';
import OnboardingFlow from './components/OnboardingFlow';
import CommandPalette from './components/CommandPalette';
import HomeLanding from './components/HomeLanding';
import { Brain } from 'lucide-react';

import { 
  INITIAL_TIMELINE, 
  INITIAL_SCREENSHOTS, 
  INITIAL_TASKS, 
  INITIAL_CALENDAR, 
  INITIAL_NOTES, 
  INITIAL_INSIGHTS, 
  INITIAL_MOOD_TREND, 
  TOMORROW_SCHEDULE, 
  INITIAL_CONFIG, 
  CHAT_HISTORY_TEMPLATES, 
  SUGGESTIONS_LIST 
} from './mockData';

import { TimelineEvent, ScreenshotItem, NoteItem, AppConfig } from './types';

export default function App() {
  // App-level state orchestrators
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0); // 0-3 for flow, 4 for complete
  const [activeTab, setActiveTab] = useState('home'); // defaults to home landing page
  const [userEmail, setUserEmail] = useState('ramzan.rizvi91@gmail.com');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [smartAlert, setSmartAlert] = useState<{ id: string; title: string; text: string } | null>(null);
  const [isDeepFocusActive, setIsDeepFocusActive] = useState(false);

  // Silences non-urgent desktop notifications when deep focus mode is active
  const toggleDeepFocusMode = () => {
    setIsDeepFocusActive(prev => {
      const next = !prev;
      if (next) {
        setSmartAlert({
          id: `focus-active-${Date.now()}`,
          title: "🔇 Deep Focus Mode Active",
          text: "Non-urgent notifications silenced. Palette shifted to muted monochromatic focus."
        });
      } else {
        setSmartAlert({
          id: `focus-inactive-${Date.now()}`,
          title: "🔔 Standard Mode Restored",
          text: "Notification filters cleared. Colors restored to vibrant theme."
        });
      }
      return next;
    });
  };

  // Core modular states from mock datasets
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);

  // Syncs and registers new focus intervals
  const handleAddTimelineEvent = (newEvent: TimelineEvent) => {
    setTimeline(prev => [newEvent, ...prev]);
  };

  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>(INITIAL_SCREENSHOTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [calendar, setCalendar] = useState(INITIAL_CALENDAR);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [insights, setInsights] = useState(INITIAL_INSIGHTS);
  const [moodTrends, setMoodTrends] = useState(INITIAL_MOOD_TREND);
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);

  // Auto-trigger a smart low-focus warning after being logged in for a few seconds
  useEffect(() => {
    if (isLoggedIn && config.smartNotifications && !isDeepFocusActive) {
      const timer = setTimeout(() => {
        setSmartAlert({
          id: `alert-auto-${Date.now()}`,
          title: "🚨 Low Focus Warning",
          text: "AI analysis detected 18 minutes of idle Chrome browsing. Recommending a 5-minute cognitive reset or resuming VS Code code review."
        });
      }, 12000); // 12 seconds after logging in
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, config.smartNotifications, isDeepFocusActive]);
  const [chatHistory, setChatHistory] = useState(
    CHAT_HISTORY_TEMPLATES.map(msg => ({ sender: msg.sender as 'user' | 'future', text: msg.text }))
  );
  const [schedule, setSchedule] = useState(TOMORROW_SCHEDULE);

  // Dynamic weights score breakdown state
  const [scoreBreakdown, setScoreBreakdown] = useState({
    focus: 96,
    health: 98,
    meetings: 88,
    learning: 92,
    sleep: 80
  });

  const handleUpdateBreakdown = (key: string, val: number) => {
    setScoreBreakdown(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Run mock screenshot capture scanner
  const handleRunAIAgent = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Append a fresh timeline event automatically
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newlyCapturedPoint: TimelineEvent = {
        id: `tl-new-${Date.now()}`,
        time: timeStr,
        title: 'Background Replay Synthesis Complete',
        description: 'Completed overall screentime analysis. Extracted active window telemetry and verified security blurs.',
        location: 'Local Workspace',
        activityType: 'AI Sync',
        mood: 'Calm',
        score: 95,
        category: 'work'
      };

      setTimeline(prev => [newlyCapturedPoint, ...prev]);
      setIsSyncing(false);
    }, 1500);
  };

  // Triggering actions from onboarding completions
  const handleOnboardingComplete = () => {
    setOnboardingStep(4);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    if (onboardingStep < 4) {
      setActiveTab('onboarding');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen transition-all duration-1000 ${isDeepFocusActive ? 'grayscale-[60%] saturate-[30%] contrast-[104%]' : ''}`}>
      <div className="bg-slate-50 dark:bg-[#03030b] text-slate-900 dark:text-slate-100 min-h-screen font-sans flex antialiased relative overflow-hidden transition-all duration-1000">
        
        {/* Ambient background glow elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/6 blur-[120px] animate-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 dark:bg-cyan-500/6 blur-[120px] animate-float" style={{ animationDelay: '-3s' }}></div>
        </div>

        {/* Render Command Palette Overlay */}
        <CommandPalette 
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          setActiveTab={(tab) => {
            // Ensure logins are valid before navigating tabs
            if (!isLoggedIn && tab !== 'onboarding' && tab !== 'login') {
              setActiveTab('login');
            } else {
              setActiveTab(tab);
            }
          }}
          onRunAIAgent={handleRunAIAgent}
        />

        {/* Outer Layout Route Management */}
        {activeTab === 'home' && !isLoggedIn ? (
          <HomeLanding 
            onStart={() => setActiveTab('login')}
            onWatchDemo={() => {
              // Jump straight into onboarding to demonstrate features
              setUserEmail('demo-investor@life-replay.ai');
              setIsLoggedIn(true);
              setActiveTab('onboarding');
            }}
          />
        ) : activeTab === 'login' && !isLoggedIn ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          /* Main Dashboard Shell featuring responsive layout sidebars */
          <div className="flex w-full min-h-screen z-10 relative">
            
            <Sidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              theme={theme}
              toggleTheme={toggleTheme}
              openCommandPalette={() => setCommandPaletteOpen(true)}
              userEmail={userEmail}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onboardingStep={onboardingStep}
              onAddTimelineEvent={handleAddTimelineEvent}
            />

            {/* Main scroll container panel */}
            <main className="flex-1 overflow-y-auto h-screen p-8 lg:p-12">
              
              <div className="max-w-6xl mx-auto pb-16">

                {/* Global Top Navigation Header Bar */}
                <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/40 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-extrabold">System Workspace</span>
                    <span className="text-slate-300 dark:text-slate-800 text-xs">/</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 dark:text-indigo-400 font-extrabold">{activeTab}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Focus Mode Pill Status */}
                    {isDeepFocusActive && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border border-zinc-500/20 font-mono animate-pulse">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                        ALERTS MUTED
                      </span>
                    )}

                    {/* Deep Focus Toggle Switch */}
                    <button 
                      onClick={toggleDeepFocusMode}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                        isDeepFocusActive 
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-100 shadow-sm shadow-black/40' 
                          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20'
                      }`}
                    >
                      <Brain className={`w-3.5 h-3.5 ${isDeepFocusActive ? 'text-zinc-400' : 'text-indigo-500'}`} />
                      <span>{isDeepFocusActive ? 'Disable Deep Focus' : 'Deep Focus Mode'}</span>
                    </button>
                  </div>
                </header>
                
                {activeTab === 'onboarding' && (
                  <OnboardingFlow 
                    onComplete={handleOnboardingComplete}
                    currentStep={onboardingStep < 4 ? onboardingStep : 0}
                    setCurrentStep={setOnboardingStep}
                  />
                )}

                {activeTab === 'dashboard' && (
                  <DashboardOverview 
                    timeline={timeline}
                    screenshots={screenshots}
                    tasks={tasks}
                    calendar={calendar}
                    setActiveTab={setActiveTab}
                    onRunAIAgent={handleRunAIAgent}
                    isSyncing={isSyncing}
                    scoreBreakdown={scoreBreakdown}
                  />
                )}

                {activeTab === 'timeline' && (
                  <ReplayTimeline 
                    timeline={timeline}
                    onUpdateEvent={(updated) => {
                      setTimeline(prev => prev.map(ev => ev.id === updated.id ? updated : ev));
                    }}
                  />
                )}

                {activeTab === 'screenshots' && (
                  <ScreenshotGallery 
                    screenshots={screenshots}
                    onAddScreenshot={(newGrab) => setScreenshots(prev => [newGrab, ...prev])}
                    onDeleteScreenshot={(id) => setScreenshots(prev => prev.filter(sc => sc.id !== id))}
                  />
                )}

                {activeTab === 'insights' && (
                  <AiInsights insights={insights} />
                )}

                {activeTab === 'planner' && (
                  <TomorrowPlanner 
                    schedule={schedule}
                    onUpdateSchedule={(updated) => setSchedule(updated)}
                  />
                )}

                {activeTab === 'future-self' && (
                  <FutureSelf 
                    chatHistory={chatHistory}
                    onAddMessage={(msg) => setChatHistory(prev => [...prev, msg])}
                    suggestions={SUGGESTIONS_LIST}
                  />
                )}

                {activeTab === 'mood' && (
                  <MoodAnalysis moodTrends={moodTrends} />
                )}

                {activeTab === 'productivity' && (
                  <ProductivityScore 
                    scoreBreakdown={scoreBreakdown}
                    onUpdateBreakdown={handleUpdateBreakdown}
                  />
                )}

                {activeTab === 'calendar' && (
                  <CalendarView 
                    events={calendar}
                    onShiftEvent={(id, newTime) => {
                      setCalendar(prev => prev.map(ev => ev.id === id ? { ...ev, time: newTime } : ev));
                    }}
                  />
                )}

                {activeTab === 'notes' && (
                  <NotesView 
                    notes={notes}
                    onAddNote={(fresh) => setNotes(prev => [fresh, ...prev])}
                    onDeleteNote={(id) => setNotes(prev => prev.filter(n => n.id !== id))}
                    onTogglePin={(id) => {
                      setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
                    }}
                    onUpdateNoteSummary={(id, sum) => {
                      setNotes(prev => prev.map(n => n.id === id ? { ...n, summary: sum } : n));
                    }}
                  />
                )}

                {activeTab === 'settings' && (
                  <SettingsView 
                    config={config}
                    onUpdateConfig={(updated) => setConfig(updated)}
                    userEmail={userEmail}
                    onTriggerDemoAlert={() => {
                      setSmartAlert({
                        id: `alert-demo-${Date.now()}`,
                        title: "🚨 Low Focus Warning (Test Simulation)",
                        text: "AI analysis detected 24 minutes of off-track activity. Guidance: Switch to VS Code and initiate Focus mode via your sidebar timer."
                      });
                    }}
                  />
                )}

              </div>

            </main>

          </div>
        )}

        {/* Floating AI Smart Notification Alert */}
        {smartAlert && (
          <div className="fixed bottom-6 right-6 z-50 w-full max-w-[340px] rounded-[24px] glass-card p-4 shadow-2xl border-indigo-500/30 dark:border-indigo-500/30 animate-fade-in flex flex-col gap-3 mr-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-500 shrink-0">
                <Brain className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{smartAlert.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{smartAlert.text}</p>
              </div>
              <button 
                onClick={() => setSmartAlert(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setSmartAlert(null)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-bold hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-all"
              >
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setSmartAlert(null);
                  setActiveTab('dashboard');
                }}
                className="px-2.5 py-1 rounded bg-indigo-500 text-white text-[10px] font-bold hover:bg-indigo-600 shadow-xs cursor-pointer transition-all"
              >
                Focus Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
