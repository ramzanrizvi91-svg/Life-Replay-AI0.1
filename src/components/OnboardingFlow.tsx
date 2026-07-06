import { useState } from 'react';
import { 
  Calendar, 
  Camera, 
  PenSquare, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  Volume2,
  ShieldAlert,
  Plus
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function OnboardingFlow({
  onComplete,
  currentStep,
  setCurrentStep
}: OnboardingFlowProps) {
  
  const [calendarConnected, setCalendarConnected] = useState(true);
  const [screenshotPermitted, setScreenshotPermitted] = useState(false);
  const [notesImported, setNotesImported] = useState(false);
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const stepsList = [
    { label: 'Connect Calendar', icon: Calendar },
    { label: 'Allow Screen Grab', icon: Camera },
    { label: 'Import Notes', icon: PenSquare },
    { label: 'Calibrate Avatar', icon: Brain }
  ];

  return (
    <div className="max-w-xl mx-auto p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl relative my-12 animate-scale-up">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Progress Track Header */}
      <div className="flex justify-between items-center pb-6 border-b border-slate-200/50 dark:border-slate-800/60">
        <div className="flex gap-1">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            return (
              <div 
                key={idx} 
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isActive 
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/15' 
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                }`}
                title={step.label}
              >
                <Icon className="w-4 h-4" />
              </div>
            );
          })}
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-slate-400">STEP {currentStep + 1} OF 4</span>
        </div>
      </div>

      {/* Content panes based on current step */}
      <div className="py-8 min-h-[220px]">
        {currentStep === 0 && (
          <div className="space-y-4 animate-fade-in">
            <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 1: Calendar Sync
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Connect Google or iCloud Calendars</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Life Replay imports task slots and synchronization headers to determine meeting overheads and shield your deep focus buffers automatically.
            </p>
            
            <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">G</div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">google_workspace_oauth</h4>
                  <p className="text-[10px] text-emerald-500 font-mono">● AUTHORIZED SECURELY</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-cyan-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 2: Vision Consent
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Allow Screenshot Captures</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We capture encrypted, zero-knowledge snapshots of active monitors every 5 minutes. Passwords, credit cards, and system keys are automatically blurred on-device.
            </p>

            <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-slate-500 leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Local Sandbox Boundary:</span> No screenshot data ever exits your browser context or container storage. Everything is fully isolated and local.
              </div>
            </div>

            <button
              onClick={() => setScreenshotPermitted(!screenshotPermitted)}
              className={`w-full py-2.5 rounded-xl border transition-all cursor-pointer font-bold text-xs flex items-center justify-center gap-2 ${
                screenshotPermitted 
                  ? 'bg-emerald-500 border-emerald-600 text-white' 
                  : 'bg-indigo-500 text-white hover:opacity-90'
              }`}
            >
              {screenshotPermitted ? '✔ PERMISSIONS APPROVED' : 'GRANT SCREENSHOT ACCESS'}
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 3: Document Uploads
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Import Markdown Notes & Priorities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sync your active notes workspace, product specs, or todo lists to give our cognitive analyzer a complete picture of your daily task goals.
            </p>

            <button
              onClick={() => setNotesImported(true)}
              className="w-full py-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {notesImported ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">3 markdown notes imported successfully!</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Drag files or click to import .md notes</span>
                </>
              )}
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 text-center animate-fade-in">
            <span className="text-[10px] font-mono font-bold text-pink-500 bg-pink-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 4: AI avatar Calibrated
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Meet Your Future Self AI Avatar</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Your avatar has loaded your calendar schedules and document priorities. You can chat with them anytime for real-time schedule alignment.
            </p>

            <div className="w-16 h-16 rounded-full bg-indigo-500/10 mx-auto flex items-center justify-center relative my-4">
              <Brain className="w-8 h-8 text-indigo-500 animate-pulse" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
            </div>

            <div className="flex justify-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> VOICE SYNTHESIS STATUS: STABLE</span>
            </div>
          </div>
        )}
      </div>

      {/* Button action Row */}
      <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/60 flex justify-between">
        <button 
          onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className={`px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer ${
            currentStep === 0 ? 'opacity-30 pointer-events-none' : ''
          }`}
        >
          Previous
        </button>

        <button 
          onClick={handleNextStep}
          className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-500/10"
        >
          <span>{currentStep === 3 ? 'Enter Life Replay Dashboard' : 'Next Step'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
