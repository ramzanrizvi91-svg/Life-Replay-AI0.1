import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Compass, 
  Fingerprint 
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('ramzan.rizvi91@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess(email);
      setLoading(false);
    }, 1000);
  };

  const handleThirdParty = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess(`${provider.toLowerCase()}User@aistudio.com`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-950 text-white font-sans select-none overflow-hidden">
      
      {/* Left side: Premium neon branding layout */}
      <div className="hidden lg:col-span-7 bg-slate-950 border-r border-slate-900 relative flex flex-col justify-between p-12">
        {/* Ambient neon spotlights */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#6C63FF]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl"></div>

        {/* Brand logo header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <span className="font-sans font-bold text-lg tracking-tight">Life Replay AI</span>
        </div>

        {/* Big display display headline */}
        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Replay Today.<br />
            Improve Tomorrow.
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Life Replay AI analyzes your daily screenshots, calendar, notes, locations, and tasks to build a complete AI-powered timeline of your day. Discover where your time went, improve productivity, and let your future self guide you.
          </p>

          <div className="flex gap-4 text-xs font-mono text-indigo-400 pt-4">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> LOCAL AES-256 BUFFER</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4" /> INTEGRATED LLM ENGINE</span>
          </div>
        </div>

        {/* Footer info line */}
        <div className="text-[10px] text-slate-500 font-mono">
          © 2026 LIFE REPLAY SYSTEMS CO. • ACTIVE SECURITY CERTIFIED • ALL PRIVACY BLURS ACTIVE
        </div>
      </div>

      {/* Right side: High-fidelity login card */}
      <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-12 bg-radial from-slate-900 to-slate-950 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-sm mx-auto space-y-8 relative">
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full">
              Secure Gateway Sync
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-3">Access Life Replay</h2>
            <p className="text-xs text-slate-400 mt-1">Select authentication protocol to initiate local sync</p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleThirdParty('Google')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-xs font-semibold cursor-pointer transition-all"
            >
              <span>G</span>
              <span>Google Account</span>
            </button>
            <button 
              onClick={() => handleThirdParty('Apple')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-xs font-semibold cursor-pointer transition-all"
            >
              <span></span>
              <span>Apple ID</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center text-[10px] font-mono uppercase text-slate-500">
            <span className="absolute inset-x-0 h-px bg-slate-800/80"></span>
            <span className="relative bg-slate-950 px-3 z-10">or connect via email token</span>
          </div>

          {/* Core Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900/40 text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase font-bold">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Access Passkey</span>
                <a href="#" className="hover:text-indigo-400 transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900/40 text-white outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {loading ? (
                <span>Syncing records...</span>
              ) : (
                <>
                  <span>Initiate Lifecycle Sync</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Trust callout */}
          <div className="p-3.5 rounded-xl border border-dashed border-indigo-500/15 bg-indigo-500/5 text-[10px] leading-relaxed text-indigo-400 flex gap-2 items-start">
            <Fingerprint className="w-4 h-4 shrink-0 animate-pulse mt-0.5" />
            <div>
              <span className="font-bold">Zero-Knowledge Guarantee:</span> Screentime analysis and logs are processed natively inside your sandbox environment. No visual details ever leave your local database.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
