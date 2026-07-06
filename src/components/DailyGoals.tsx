import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Trophy, Sparkles, Star, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function DailyGoals() {
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: 'g-1', text: 'Analyze morning screentime telemetry for focus drift', completed: true },
    { id: 'g-2', text: 'Execute 2 full Pomodoro focus blocks', completed: false },
    { id: 'g-3', text: 'Document life replay insights for tomorrow\'s AI planner', completed: false },
  ]);
  const [newGoalText, setNewGoalText] = useState('');
  
  // Confetti / particle sparks state to show on completion
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
  const [sparkIdCounter, setSparkIdCounter] = useState(0);

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const newGoal: GoalItem = {
      id: `g-${Date.now()}`,
      text: newGoalText.trim(),
      completed: false
    };

    setGoals(prev => [...prev, newGoal]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id: string, currentStatus: boolean, e: React.MouseEvent) => {
    // If we are completing the task, trigger a celebratory micro-interaction at the click location
    if (!currentStatus) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn celebratory emojis around the clicked checkbox
      const emojis = ['✨', '🔥', '🎉', '⭐', '🚀', '🙌'];
      const newSparks = Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12 + (Math.random() * 15 - 7.5);
        const distance = 40 + Math.random() * 40;
        const radian = (angle * Math.PI) / 180;
        return {
          id: sparkIdCounter + i,
          x: clickX + Math.cos(radian) * distance,
          y: clickY + Math.sin(radian) * distance - 20, // offset upwards slightly
          char: emojis[Math.floor(Math.random() * emojis.length)]
        };
      });

      setSparkIdCounter(prev => prev + 12);
      setSparks(prev => [...prev, ...newSparks]);

      // Automatically clean up sparks after animation ends
      setTimeout(() => {
        setSparks(prev => prev.filter(s => !newSparks.some(ns => ns.id === s.id)));
      }, 1000);
    }

    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="rounded-[24px] glass-card p-6 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Absolute ambient lights */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Sparks Overlay for celebratory micro-interactions */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {sparks.map(spark => (
            <motion.span
              key={spark.id}
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{ 
                opacity: [1, 0.9, 0], 
                scale: [0.6, 1.3, 0.4], 
                x: spark.x, 
                y: spark.y 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute text-sm font-bold pointer-events-none select-none"
              style={{ left: 16, top: 16 }}
            >
              {spark.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div>
        {/* Header Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Today's Micro-Milestones</h3>
          </div>
          <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full font-bold">
            {completedCount}/{goals.length} Goals
          </span>
        </div>

        {/* Dynamic Animated Progress Bar Section */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50/50 dark:bg-white/2 border border-slate-200/20 dark:border-white/2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Daily Completion Goal</span>
            <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">{progressPercent}%</span>
          </div>

          <div className="relative w-full h-2.5 bg-slate-200/60 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {progressPercent === 100 && (
            <motion.div 
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold font-mono mt-2"
            >
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
              <span>Perfect Day Achieved! High Focus Maintained.</span>
            </motion.div>
          )}
        </div>

        {/* Goals Checklist List */}
        <div className="mt-4 space-y-2.5 max-h-[190px] overflow-y-auto pr-1 scrollbar-thin">
          <AnimatePresence initial={false}>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/3 bg-white/50 dark:bg-white/1 hover:bg-white dark:hover:bg-white/2 hover:border-slate-200 dark:hover:border-white/5 transition-all gap-2"
              >
                {/* Clicking toggles status & launches custom click confetti */}
                <button
                  onClick={(e) => handleToggleGoal(goal.id, goal.completed, e)}
                  className="flex items-center gap-2.5 text-left flex-1 cursor-pointer select-none"
                  style={{ minHeight: '44px' }} // touch friendly
                >
                  <div className="shrink-0 text-slate-400 hover:text-indigo-500 transition-colors">
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs leading-relaxed transition-all ${
                    goal.completed 
                      ? 'text-slate-400 dark:text-slate-500 line-through font-medium' 
                      : 'text-slate-700 dark:text-slate-200 font-semibold'
                  }`}>
                    {goal.text}
                  </span>
                </button>

                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-2 cursor-pointer"
                  title="Remove goal"
                  style={{ minWidth: '44px', minHeight: '44px' }} // touch friendly
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {goals.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400 font-mono">
              No daily milestones configured. Add one below!
            </div>
          )}
        </div>
      </div>

      {/* Input Form to create a micro-milestone */}
      <form onSubmit={handleAddGoal} className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5 flex gap-2">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="New milestone, e.g. read telemetry..."
          className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-850 bg-white/40 dark:bg-black/20 text-slate-900 dark:text-white outline-none focus:border-indigo-500/80 transition-all placeholder-slate-400"
          style={{ minHeight: '44px' }}
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all cursor-pointer flex items-center justify-center shadow-xs"
          style={{ minWidth: '44px', minHeight: '44px' }}
          title="Add Milestone"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
