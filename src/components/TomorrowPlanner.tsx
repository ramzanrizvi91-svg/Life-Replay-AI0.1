import { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  RefreshCw,
  Clock
} from 'lucide-react';

interface ScheduleBlock {
  time: string;
  block: string;
  description: string;
  status: string; // locked, scheduled, flexible
}

interface TomorrowPlannerProps {
  schedule: ScheduleBlock[];
  onUpdateSchedule: (updated: ScheduleBlock[]) => void;
}

export default function TomorrowPlanner({
  schedule,
  onUpdateSchedule
}: TomorrowPlannerProps) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(schedule);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // States for editing or creating
  const [editBlockName, setEditBlockName] = useState('');
  const [editBlockTime, setEditBlockTime] = useState('');
  const [editBlockDesc, setEditBlockDesc] = useState('');
  const [editBlockStatus, setEditBlockStatus] = useState('scheduled');

  const [newBlock, setNewBlock] = useState(false);

  const startEditing = (idx: number, b: ScheduleBlock) => {
    setEditingIndex(idx);
    setEditBlockName(b.block);
    setEditBlockTime(b.time);
    setEditBlockDesc(b.description);
    setEditBlockStatus(b.status);
  };

  const saveBlockChange = (idx: number) => {
    const updated = [...blocks];
    updated[idx] = {
      time: editBlockTime,
      block: editBlockName,
      description: editBlockDesc,
      status: editBlockStatus
    };
    setBlocks(updated);
    onUpdateSchedule(updated);
    setEditingIndex(null);
  };

  const deleteBlock = (idx: number) => {
    const updated = blocks.filter((_, i) => i !== idx);
    setBlocks(updated);
    onUpdateSchedule(updated);
  };

  const addNewBlockItem = () => {
    const fresh: ScheduleBlock = {
      time: '04:00 PM - 05:00 PM',
      block: 'New Scheduled Task',
      description: 'Review custom requirements and sync.',
      status: 'scheduled'
    };
    const updated = [...blocks, fresh];
    setBlocks(updated);
    onUpdateSchedule(updated);
  };

  const toggleLockStatus = (idx: number) => {
    const updated = [...blocks];
    updated[idx].status = updated[idx].status === 'locked' ? 'flexible' : 'locked';
    setBlocks(updated);
    onUpdateSchedule(updated);
  };

  // Mock AI optimization
  const optimizeSchedule = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      // Re-order and improve descriptions automatically
      const optimized: ScheduleBlock[] = [
        { time: '08:00 AM - 08:30 AM', block: 'Hydration & Mindful Morning Breathing', description: 'Sunlight eyes sync, 10m breathing before laptop access.', status: 'locked' },
        { time: '08:30 AM - 09:30 AM', block: 'Technical Standup (Optimized)', description: 'Limit conversation to 20 minutes to shield deep work window.', status: 'flexible' },
        { time: '09:30 AM - 12:00 PM', block: 'Deep Work (Shielded Coding Block)', description: 'Write modular client interfaces. Screen grabs and alerts disabled.', status: 'locked' },
        { time: '12:00 PM - 12:45 PM', block: 'Digital Detox Lunch Break', description: 'Step away from screen. 15-minute outdoor walk.', status: 'locked' },
        { time: '01:00 PM - 01:45 PM', block: 'Emails & Communication Batch', description: 'Process Linear notifications during post-lunch energy dip.', status: 'flexible' },
        { time: '01:45 PM - 03:45 PM', block: 'Technical Refactoring (High Focus)', description: 'Optimize CSS bundling, lint typescript errors.', status: 'locked' },
        { time: '04:00 PM - 04:30 PM', block: 'Active Cognitive Release', description: 'Decompress before workout. No active monitors.', status: 'flexible' },
        { time: '05:00 PM - 06:15 PM', block: 'Cardio Gym Workout', description: 'Physical recovery block.', status: 'scheduled' },
        { time: '07:00 PM - 10:00 PM', block: 'Blue-Light Filter & Wind-down', description: 'Reading, dark settings, preparation for 8.5h sleep cycle.', status: 'scheduled' }
      ];
      setBlocks(optimized);
      onUpdateSchedule(optimized);
      setIsOptimizing(false);
    }, 1800);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'locked':
        return <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> LOCKED</span>;
      case 'flexible':
        return <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center gap-1"><Unlock className="w-2.5 h-2.5" /> FLEXIBLE</span>;
      default:
        return <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> SCHEDULED</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <span>AI Tomorrow Schedule Planner</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Life Replay calculated your focus cycles and generated an optimized agenda for tomorrow. Lock important items and optimize the rest.
          </p>
        </div>

        <button
          onClick={optimizeSchedule}
          disabled={isOptimizing}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-90 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/10 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Synthesizing schedule...' : 'Optimize with AI'}</span>
        </button>
      </div>

      {/* Main Schedule blocks list */}
      <div className="space-y-4">
        {blocks.map((b, idx) => {
          const isEditing = editingIndex === idx;

          return (
            <div 
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isEditing 
                  ? 'bg-white dark:bg-slate-950 border-indigo-500' 
                  : 'bg-white/60 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-950/80'
              }`}
            >
              {isEditing ? (
                /* Edit block state */
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Block Time</label>
                      <input 
                        type="text" 
                        value={editBlockTime}
                        onChange={(e) => setEditBlockTime(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Block Name</label>
                      <input 
                        type="text" 
                        value={editBlockName}
                        onChange={(e) => setEditBlockName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Description / Instruction</label>
                      <input 
                        type="text" 
                        value={editBlockDesc}
                        onChange={(e) => setEditBlockDesc(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Constraint Type</label>
                      <select 
                        value={editBlockStatus}
                        onChange={(e) => setEditBlockStatus(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      >
                        <option value="locked">Locked (Shielded)</option>
                        <option value="scheduled">Scheduled (Flexible)</option>
                        <option value="flexible">Flexible (Can shift)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button 
                      onClick={() => setEditingIndex(null)}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => saveBlockChange(idx)}
                      className="px-3 py-1 text-[11px] font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                /* Display block state */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Time Column */}
                    <div className="w-40 font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      {b.time}
                    </div>

                    {/* Block Info */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.block}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{b.description}</p>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                    <button 
                      onClick={() => toggleLockStatus(idx)}
                      title="Lock/Unlock event position"
                      className="cursor-pointer"
                    >
                      {getStatusBadge(b.status)}
                    </button>
                    
                    <button 
                      onClick={() => startEditing(idx, b)}
                      className="text-[10px] text-slate-500 hover:text-indigo-500 font-mono font-bold cursor-pointer"
                    >
                      EDIT
                    </button>

                    <button 
                      onClick={() => deleteBlock(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Append controls */}
      <div className="flex justify-center">
        <button
          onClick={addNewBlockItem}
          className="px-4 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Schedule Block</span>
        </button>
      </div>

    </div>
  );
}
