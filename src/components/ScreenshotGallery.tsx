import { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Cpu, 
  Trash2, 
  PlusCircle, 
  Monitor, 
  Code, 
  Chrome, 
  Layers, 
  Terminal,
  Activity
} from 'lucide-react';
import { ScreenshotItem } from '../types';

interface ScreenshotGalleryProps {
  screenshots: ScreenshotItem[];
  onAddScreenshot: (newScreenshot: ScreenshotItem) => void;
  onDeleteScreenshot: (id: string) => void;
}

export default function ScreenshotGallery({
  screenshots,
  onAddScreenshot,
  onDeleteScreenshot
}: ScreenshotGalleryProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Simulated screenshot templates to randomly append when they click "Capture Screen Grab"
  const captureTemplates = [
    {
      app: 'Slack',
      activity: 'Direct Messaging',
      caption: 'Reading developer thread on API token rotation. Moderately productive but slight distraction overlap.',
      focusScore: 70,
      distractionScore: 30,
      suggestions: ['Move team discussions to structured daily standups', 'Keep notifications muted']
    },
    {
      app: 'VS Code',
      activity: 'Debugging CSS layouts',
      caption: 'Investigating Tailwind flexbox overlaps and styling nested interactive cards inside the sidebar structure.',
      focusScore: 99,
      distractionScore: 1,
      suggestions: ['Excellent flow state detected!', 'Keep compiling code directly']
    },
    {
      app: 'Spotify',
      activity: 'Music Selection',
      caption: 'Switching audio tracks and managing playlist queue. Brief 1.5-minute cognitive interruption.',
      focusScore: 40,
      distractionScore: 60,
      suggestions: ['Use physical keyboard media controls instead of opening Spotify UI']
    }
  ];

  const handleSimulatedCapture = () => {
    setIsUploading(true);
    setTimeout(() => {
      const template = captureTemplates[Math.floor(Math.random() * captureTemplates.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newGrab: ScreenshotItem = {
        id: `sc-${Date.now()}`,
        timestamp: timeString,
        imageSrc: `uploaded_${template.app.toLowerCase()}`,
        caption: template.caption,
        app: template.app,
        activity: template.activity,
        focusScore: template.focusScore,
        distractionScore: template.distractionScore,
        suggestions: template.suggestions
      };
      
      onAddScreenshot(newGrab);
      setIsUploading(false);
    }, 1200);
  };

  const getAppIcon = (app: string) => {
    switch (app.toLowerCase()) {
      case 'vscode':
      case 'vs code':
        return <Code className="w-4 h-4 text-sky-400" />;
      case 'chrome':
      case 'google chrome':
        return <Chrome className="w-4 h-4 text-emerald-400" />;
      case 'figma':
        return <Layers className="w-4 h-4 text-purple-400" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-indigo-400" />;
    }
  };

  // Helper to draw beautiful premium CSS illustrations in place of raw image tags
  const renderMockScreen = (app: string) => {
    const appLower = app.toLowerCase();
    
    if (appLower.includes('figma')) {
      return (
        <div className="w-full h-40 bg-slate-900 flex flex-col justify-between p-3 border-b border-slate-800 relative overflow-hidden select-none">
          {/* Mock Figma UI layout */}
          <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
            <div className="flex gap-1.5 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Life_Replay_v2.fig</span>
            </div>
            <span>Page 1 / Dashboard</span>
          </div>
          {/* Main Visual Node */}
          <div className="flex justify-center items-center h-24">
            <div className="p-4 rounded-xl border border-[#6C63FF]/40 bg-slate-950/80 shadow-lg text-center max-w-[150px]">
              <div className="w-5 h-5 rounded-full bg-indigo-500/10 mx-auto mb-2 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="h-1 w-12 bg-[#00E5FF] rounded-full mx-auto mb-1.5"></div>
              <div className="text-[8px] font-mono text-slate-400">Glassmorphism Card</div>
            </div>
          </div>
          {/* Tooltip Cursor */}
          <div className="absolute bottom-6 right-10 bg-[#6C63FF] text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <span>pointer</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      );
    }

    if (appLower.includes('vscode') || appLower.includes('code')) {
      return (
        <div className="w-full h-40 bg-zinc-950 flex flex-col justify-between p-3 border-b border-zinc-900 relative overflow-hidden font-mono select-none">
          {/* Mock Editor tabs */}
          <div className="flex gap-1 text-[8px] text-zinc-500 border-b border-zinc-900 pb-1">
            <span className="bg-zinc-900 text-sky-400 px-2 py-0.5 rounded-t">App.tsx</span>
            <span className="px-2 py-0.5">types.ts</span>
            <span className="px-2 py-0.5">index.css</span>
          </div>
          {/* Mock Code Block */}
          <div className="text-[9px] text-zinc-400 flex-1 pt-2 space-y-1">
            <div className="text-zinc-500">1: import React from 'react';</div>
            <div>2: <span className="text-purple-400">const</span> <span className="text-amber-400">Timeline</span> = () =&gt; &#123;</div>
            <div className="pl-3">3: <span className="text-sky-400">return</span> (</div>
            <div className="pl-6 text-green-400">4: &lt;div id="g-container"&gt;&lt;/div&gt;</div>
            <div className="pl-3">5: );</div>
            <div>6: &#125;;</div>
          </div>
          {/* Status Line */}
          <div className="flex justify-between text-[8px] text-zinc-600 font-mono mt-1 border-t border-zinc-900 pt-1">
            <span>Ln 4, Col 12</span>
            <span className="text-emerald-500 font-bold">TypeScript • Prettier</span>
          </div>
        </div>
      );
    }

    if (appLower.includes('twitter') || appLower.includes('chrome') || appLower.includes('slack')) {
      return (
        <div className="w-full h-40 bg-slate-900 flex flex-col justify-between p-3 border-b border-slate-800 relative overflow-hidden select-none">
          {/* Mock Browser URL path */}
          <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-md text-[8px] text-slate-500 border border-slate-800/60 font-mono mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
            <span>https://twitter.com/search?q=ai_saas</span>
          </div>
          {/* Social feed simulation */}
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 items-start p-1.5 rounded bg-slate-950/40 border border-slate-800/40">
              <div className="w-5 h-5 rounded-full bg-slate-700 shrink-0"></div>
              <div className="space-y-1 flex-1">
                <div className="h-1.5 w-16 bg-slate-500 rounded-full"></div>
                <div className="h-2 w-full bg-slate-700 rounded-full"></div>
                <div className="h-1.5 w-3/4 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-4 w-12 h-12 rounded-full border-4 border-rose-500/20 flex items-center justify-center animate-ping">
            <div className="w-4 h-4 rounded-full bg-rose-500"></div>
          </div>
        </div>
      );
    }

    // Default Terminal Style
    return (
      <div className="w-full h-40 bg-zinc-950 flex flex-col justify-between p-3 border-b border-zinc-900 relative overflow-hidden font-mono text-[9px] select-none text-amber-500">
        <div className="flex justify-between text-zinc-600 text-[8px] border-b border-zinc-900 pb-1">
          <span>bash • zsh • port 3000</span>
          <span>● active</span>
        </div>
        <div className="flex-1 space-y-1.5 pt-2 text-slate-300">
          <div>$ <span className="text-indigo-400">npm run compile_applet</span></div>
          <div className="text-zinc-500">[14:17:23] Compiling TypeScript bundles...</div>
          <div className="text-emerald-500">✔ Success: Built static files inside dist/ in 1.4s</div>
          <div>$ <span className="text-indigo-400">node dist/server.cjs</span></div>
          <div className="text-emerald-400">● Server listening on http://0.0.0.0:3000</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upper info controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" />
            <span>Screenshot Capture Analysis</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View visual logs processed by the local OCR vision model. Hover over cards to analyze extracted tokens and distraction metrics.
          </p>
        </div>

        {/* Dynamic Mock Capture Trigger */}
        <button
          onClick={handleSimulatedCapture}
          disabled={isUploading}
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/10 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isUploading ? 'Capturing screen...' : 'Capture Active Screen'}</span>
        </button>
      </div>

      {/* Grid gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {screenshots.map((screen) => (
          <div 
            key={screen.id} 
            className="group rounded-[24px] glass-card glass-card-interactive overflow-hidden shadow-xs relative"
          >
            {/* Mock Screen Visual Header */}
            <div className="relative">
              {renderMockScreen(screen.app)}
              
              {/* Overlay stats badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 text-[10px] font-mono text-white flex items-center gap-1 font-bold backdrop-blur-md border border-white/10">
                  {getAppIcon(screen.app)}
                  <span>{screen.app}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/90 text-[10px] font-mono text-white flex items-center gap-1 font-bold backdrop-blur-md">
                  <span>{screen.timestamp}</span>
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Extracted Activity</span>
                  <span className="text-indigo-500 font-bold font-mono text-[10px]">{screen.activity}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 italic">
                  "{screen.caption}"
                </p>
              </div>

              {/* Metrics block */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/50 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Focus Score</span>
                  <div className="text-lg font-extrabold text-emerald-500 mt-0.5">{screen.focusScore}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Distraction</span>
                  <div className="text-lg font-extrabold text-rose-500 mt-0.5">{screen.distractionScore}%</div>
                </div>
              </div>

              {/* AI Suggestion box */}
              {screen.suggestions && screen.suggestions.length > 0 && (
                <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5">
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-mono uppercase text-[9px] tracking-wider">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <span>AI Safety Recommendation</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
                    {screen.suggestions.map((sug, idx) => (
                      <li key={idx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action line */}
              <div className="flex justify-between items-center pt-2">
                <button 
                  onClick={() => setSelectedScreenshot(screen)}
                  className="text-[11px] text-indigo-500 hover:text-indigo-600 font-bold cursor-pointer flex items-center gap-1"
                >
                  <Activity className="w-3 h-3" />
                  <span>Inspect Metadata</span>
                </button>

                <button 
                  onClick={() => onDeleteScreenshot(screen.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                  title="Delete screen log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Screen Metadata Detail Dialog modal (Simulated overlay) */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative animate-scale-up">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-500" />
              <span>OCR Token Inspector</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Metadata harvested for App: {selectedScreenshot.app}</p>
            
            <div className="mt-5 space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex justify-between font-mono">
                  <span>Capture Node Hash:</span>
                  <span className="font-bold">#sc-{selectedScreenshot.id}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Vision Resolution:</span>
                  <span className="font-bold">2560 x 1600 (Retina)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Extracted Window Hierarchy:</span>
                  <span className="font-bold text-indigo-500">{selectedScreenshot.app} &gt; {selectedScreenshot.activity}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Analyzed Text Logs:</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-lg leading-relaxed">
                  "{selectedScreenshot.caption}"
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Replay Suggested Actions:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 text-[10px] font-mono font-bold">Lock app session</span>
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold">Whitelist browser tab</span>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-mono font-bold">Auto-archive capture</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedScreenshot(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
