import { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Smile, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  CheckCircle2, 
  Activity, 
  Sparkles,
  Award,
  BookOpen,
  Coffee,
  Calendar
} from 'lucide-react';
import { TimelineEvent } from '../types';

interface ReplayTimelineProps {
  timeline: TimelineEvent[];
  onUpdateEvent: (updatedEvent: TimelineEvent) => void;
}

export default function ReplayTimeline({
  timeline,
  onUpdateEvent
}: ReplayTimelineProps) {
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({
    'tl-2': true,
    'tl-3': true,
    'tl-5': true,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editScore, setEditScore] = useState(85);
  const [editMood, setEditMood] = useState<'Focused' | 'Calm' | 'Stressed' | 'Energized' | 'Distracted'>('Calm');

  const toggleExpand = (id: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const startEditing = (event: TimelineEvent) => {
    setEditingId(event.id);
    setEditTitle(event.title);
    setEditDesc(event.description);
    setEditScore(event.score);
    setEditMood(event.mood);
  };

  const saveEdit = (event: TimelineEvent) => {
    onUpdateEvent({
      ...event,
      title: editTitle,
      description: editDesc,
      score: editScore,
      mood: editMood
    });
    setEditingId(null);
  };

  const getMoodEmoji = (mood: TimelineEvent['mood']) => {
    switch (mood) {
      case 'Focused': return '🧠';
      case 'Calm': return '😌';
      case 'Stressed': return '😤';
      case 'Energized': return '⚡';
      case 'Distracted': return '🥱';
      default: return '😌';
    }
  };

  const getMoodClass = (mood: TimelineEvent['mood']) => {
    switch (mood) {
      case 'Focused': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400';
      case 'Calm': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Stressed': return 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400';
      case 'Energized': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
      case 'Distracted': return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getCategoryIcon = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'work': return <Award className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'learning': return <BookOpen className="w-4 h-4" />;
      case 'break': return <Coffee className="w-4 h-4" />;
      case 'exercise': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Interactive Day Replay Timeline</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review detailed timeline entries synthesized from active screen monitors and integrations. Edit values to train your personal AI.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-slate-500">
          <span>📅 Today: Monday, July 6, 2026</span>
        </div>
      </div>

      {/* Main Timeline Connector Structure */}
      <div className="relative pl-8 border-l-2 border-dashed border-slate-200 dark:border-slate-800 space-y-10 py-4 ml-3">
        {timeline.map((event) => {
          const isExpanded = !!expandedEvents[event.id];
          const isEditing = editingId === event.id;
          const moodEmoji = getMoodEmoji(event.mood);

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Bullet Anchor */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-500 text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 z-10">
                <span className="text-[10px]">{moodEmoji}</span>
              </div>

              {/* Timeline Card */}
              <div className={`p-5 rounded-[24px] glass-card transition-all duration-300 ${
                isExpanded 
                  ? 'border-indigo-500/30 dark:border-indigo-500/30 shadow-lg' 
                  : 'glass-card-interactive shadow-xs'
              }`}>
                {/* Header line */}
                <div className="flex items-center justify-between gap-4 select-none cursor-pointer" onClick={() => toggleExpand(event.id)}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      {event.time}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${getMoodClass(event.mood)}`}>
                      <span>{moodEmoji}</span>
                      <span className="hidden sm:inline">{event.mood}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>{event.score}%</span>
                    </span>

                    <button 
                      onClick={() => toggleExpand(event.id)}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Sections */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-4 animate-slide-down">
                    
                    {isEditing ? (
                      /* Editing Form State */
                      <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/80">
                        <div className="text-xs font-bold text-indigo-500 font-mono flex items-center gap-1.5">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>RECALIBRATE AI ASSESSMENT</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Title</label>
                            <input 
                              type="text" 
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Cognitive Mood State</label>
                            <select 
                              value={editMood}
                              onChange={(e) => setEditMood(e.target.value as any)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                            >
                              <option value="Focused">Focused 🧠</option>
                              <option value="Calm">Calm 😌</option>
                              <option value="Stressed">Stressed 😤</option>
                              <option value="Energized">Energized ⚡</option>
                              <option value="Distracted">Distracted 🥱</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">AI Summary Description</label>
                          <textarea 
                            value={editDesc}
                            rows={3}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase font-mono">
                            <span>Adjust Productivity Score</span>
                            <span className="text-indigo-500 font-bold font-mono">{editScore}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={editScore}
                            onChange={(e) => setEditScore(parseInt(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button 
                            onClick={() => setEditingId(null)}
                            className="px-4 py-2.5 md:px-3 md:py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs md:text-[11px] font-bold transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => saveEdit(event)}
                            className="px-4 py-2.5 md:px-3 md:py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs md:text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Save Recalibration
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display State */
                      <div className="space-y-4">
                        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                          {event.description}
                        </div>

                        {/* Event Location & Category Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          {event.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="font-mono">{event.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">Class:</span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center gap-1 font-mono uppercase text-[9px] font-bold">
                              {getCategoryIcon(event.category)}
                              <span>{event.category}</span>
                            </span>
                          </div>
                        </div>

                        {/* Premium AI Replay Insights Overlay */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 border border-indigo-500/10 dark:border-indigo-500/5 text-xs text-slate-600 dark:text-slate-300 flex gap-3">
                          <div className="w-6 h-6 shrink-0 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Life Replay AI Synthesis:</span>{' '}
                            {event.category === 'work' && 'Your deep work session showed absolute target focus. Code compiled cleanly. High cognitive effectiveness.'}
                            {event.category === 'meeting' && 'Meeting was highly active, but cognitive load analysis suggests slight exhaustion at the 30-minute mark.'}
                            {event.category === 'break' && 'Rest interval was optimal. Cognitive exhaustion dropped by 18%. Good recharge.'}
                            {event.category === 'exercise' && 'Excellent stress relief mechanism. Monitored heart rate showed healthy recovery.'}
                            {!['work', 'meeting', 'break', 'exercise'].includes(event.category) && 'Standard micro-activity recorded and indexed.'}
                          </div>
                        </div>

                        {/* Edit and feedback buttons */}
                        <div className="flex justify-end gap-2 pt-2">
                          <button 
                            onClick={() => startEditing(event)}
                            className="px-4 py-2.5 md:px-3 md:py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs md:text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-800/40"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Recalibrate Points</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
