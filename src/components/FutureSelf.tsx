import { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Send, 
  Sparkles, 
  Lightbulb, 
  User, 
  Clock,
  Mic,
  Volume2
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'future';
  text: string;
}

interface FutureSelfProps {
  chatHistory: ChatMessage[];
  onAddMessage: (msg: ChatMessage) => void;
  suggestions: string[];
}

export default function FutureSelf({
  chatHistory,
  onAddMessage,
  suggestions
}: FutureSelfProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Context-aware simulated AI responses from your "Future Self"
  const generateFutureResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('twitter') || q.includes('distract') || q.includes('social')) {
      return "I already lived through this, and honestly, the Twitter distraction at 1:45 PM cost us almost 45 minutes of focus recovery. It isn't just the 15 minutes of scrolling—it's the context switching cost that ruins the entire block. Tomorrow, we should try using our settings to whitelist Chrome between 1 PM and 3 PM. Trust me, you'll feel much happier in the evening!";
    }
    if (q.includes('morning') || q.includes('start') || q.includes('early')) {
      return "Our morning peak focus is incredibly strong between 9:30 AM and 12:00 PM. I noticed you synced calendar slots right in the middle of it today. Tomorrow, I've adjusted the schedule to group meetings in the afternoon so we can code uninterrupted. Let's start with high-intensity work immediately after coffee!";
    }
    if (q.includes('fatigue') || q.includes('tired') || q.includes('energy')) {
      return "That 1:30 PM post-lunch dip is real. Today we tried to push through with code, but our brain waves were sluggish. Tomorrow, let's do a hard disconnect—shut the laptop, step outside for exactly 10 minutes to get natural sunlight. It tells the pineal gland to stop releasing melatonin. You will return twice as sharp.";
    }
    if (q.includes('refactor') || q.includes('coding') || q.includes('code')) {
      return "The refactoring session at 2:30 PM went beautifully today. We cleared out some technical debt. Let's make sure we document these helpers so future team members don't duplicate them.";
    }
    
    return "I am looking back at today, and our cumulative focus of 5.2 hours is outstanding. We just need to defend our borders. Keep your deep blocks locked tomorrow, and make sure you do that evening cardio—it is what keeps our stress levels down to 24%. Ask me anything about our day!";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: inputText };
    onAddMessage(userMsg);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateFutureResponse(userMsg.text);
      onAddMessage({ sender: 'future', text: replyText });
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (sug: string) => {
    const userMsg: ChatMessage = { sender: 'user', text: sug };
    onAddMessage(userMsg);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateFutureResponse(sug);
      onAddMessage({ sender: 'future', text: replyText });
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
      
      {/* Left Panel: Glowing AI Avatar orb */}
      <div className="lg:col-span-5 rounded-[24px] glass-card p-6 flex flex-col items-center justify-between relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center">
          <span className="text-[10px] font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full">
            Future You Avatar • Active
          </span>
          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-3">Neural Brainwave Sync</h3>
          <p className="text-xs text-slate-400 mt-1">Simulating advice from your self in 24 hours</p>
        </div>

        {/* Pulsing Avatar Orb Visual */}
        <div className="relative w-48 h-48 flex items-center justify-center my-6">
          {/* Orbital Ring 1 */}
          <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/20 animate-spin" style={{ animationDuration: '40s' }}></div>
          {/* Orbital Ring 2 */}
          <div className="absolute inset-4 rounded-full border border-indigo-500/10 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
          
          {/* Glowing Backdrops */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#6C63FF]/30 to-[#00E5FF]/30 blur-xl animate-pulse"></div>

          {/* Main Avatar Circle */}
          <div className="absolute w-32 h-32 rounded-full bg-slate-950 border-2 border-indigo-500/60 flex flex-col items-center justify-center text-center p-4 shadow-xl z-10">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-1">
              <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <span className="text-xs font-mono font-bold text-indigo-400 tracking-wide">FUTURE SELF</span>
            <span className="text-[9px] font-mono text-emerald-500 mt-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
              COACHING
            </span>
          </div>
        </div>

        {/* Mini settings details */}
        <div className="w-full text-center space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/60 text-xs text-slate-500 leading-relaxed">
            "We already finished tomorrow, and you made great decisions. Let's sync this advice directly to our notification widget."
          </div>

          <div className="flex justify-center gap-4 text-xs font-mono text-slate-400">
            <button className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice Sync</span>
            </button>
            <span>•</span>
            <button className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer">
              <Mic className="w-3.5 h-3.5" />
              <span>Set triggers</span>
            </button>
          </div>
        </div>

      </div>

      {/* Right Panel: Chat interface */}
      <div className="lg:col-span-7 rounded-[24px] glass-card flex flex-col h-full overflow-hidden">
        
        {/* Chat header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">Active Synchronous Session</h4>
              <p className="text-[9px] text-slate-400 font-mono">Calibrated based on Today's logs</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Monday, Jul 6</span>
        </div>

        {/* Chat message space */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {chatHistory.map((msg, index) => (
            <div 
              key={index}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Profile icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              </div>

              {/* Text Bubble */}
              <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-500 text-white rounded-tr-none'
                  : 'bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/40 text-slate-700 dark:text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/20 dark:border-slate-800/30 flex items-center gap-1.5 rounded-tl-none">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Suggestion list triggers */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-900 bg-slate-50/20 dark:bg-slate-950/20">
          <div className="text-[10px] font-bold font-mono text-slate-400 uppercase mb-2 px-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended inquiries</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(sug)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 bg-white dark:bg-slate-950 text-[10px] text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all cursor-pointer truncate max-w-full"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your Future Self about tomorrow's schedule..."
            className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
          />
          <button 
            onClick={handleSendMessage}
            className="p-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/10 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
