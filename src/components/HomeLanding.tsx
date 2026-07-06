import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Clock, 
  ShieldCheck, 
  Brain, 
  Monitor,
  Heart,
  Zap,
  TrendingUp,
  Smile
} from 'lucide-react';

interface HomeLandingProps {
  onStart: () => void;
  onWatchDemo: () => void;
}

export default function HomeLanding({
  onStart,
  onWatchDemo
}: HomeLandingProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans select-none overflow-hidden relative flex flex-col justify-between">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-2xl"></div>

      {/* Header bar */}
      <header className="p-6 border-b border-slate-900/80 backdrop-blur-md flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <span className="font-sans font-bold text-lg tracking-tight">Life Replay AI</span>
        </div>

        <button
          onClick={onStart}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
        >
          Console Sign-In
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Hero typography column */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Tagline sticker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-bounce" />
            <span>What if AI could replay your day and improve tomorrow?</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white">
            Replay Today.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Improve Tomorrow.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-sans">
            Life Replay AI analyzes your daily screenshots, calendar, notes, locations, and tasks to build a complete AI-powered timeline of your day. Discover where your time went, improve productivity, and let your future self guide you.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStart}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-90 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Start Replay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWatchDemo}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/10" />
              <span>Watch Demo Preview</span>
            </button>
          </div>

          <div className="flex gap-8 text-slate-500 text-xs font-mono pt-4 border-t border-slate-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>On-Device Privacy Mask</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Zero Latency Sync</span>
            </div>
          </div>
        </div>

        {/* Right floating cards illustration col */}
        <div className="lg:col-span-5 relative w-full h-[400px] flex items-center justify-center">
          
          {/* Floating Card 1: AI Score bubble */}
          <div className="absolute top-10 left-10 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl w-56 animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">FOCUS INDEX</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold mt-2 text-white">87%</div>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">+3.2% compared to last cycle</p>
          </div>

          {/* Floating Card 2: Future Self chat draft */}
          <div className="absolute bottom-12 right-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl w-64 animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 font-bold uppercase">
              <Brain className="w-4 h-4" />
              <span>Future Self Coaching</span>
            </div>
            <p className="text-xs text-slate-300 italic mt-3 leading-relaxed">
              "Tomorrow, let's move deep work earlier. Cafes are 15% more distracting."
            </p>
          </div>

          {/* Floating Card 3: Screen grabbed template visual */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-28 rounded-2xl border border-indigo-500/30 bg-[#6C63FF]/5 backdrop-blur-md flex items-center justify-center p-4 text-center pointer-events-none select-none">
            <div className="space-y-1.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 mx-auto flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">LOCAL COGNITIVE REPLAY</div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer statistics band */}
      <footer className="p-6 border-t border-slate-900/80 bg-slate-950/40 relative z-10 text-center font-mono text-[10px] text-slate-500">
        LIFE REPLAY AI • DESIGNED IN ALIGNMENT WITH THE APPLE & LINEAR DESIGN SYSTEMS • LOCAL SECURITY AES-256 ENCRYPTED
      </footer>

    </div>
  );
}
