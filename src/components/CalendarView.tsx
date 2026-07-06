import { useState } from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onShiftEvent: (id: string, time: string) => void;
}

export default function CalendarView({
  events,
  onShiftEvent
}: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [syncedEvents, setSyncedEvents] = useState<CalendarEvent[]>(events);
  const [shiftedId, setShiftedId] = useState<string | null>(null);

  const weekDays = [
    { key: 'Mon', num: '6', label: 'Mon 6', active: true },
    { key: 'Tue', num: '7', label: 'Tue 7' },
    { key: 'Wed', num: '8', label: 'Wed 8' },
    { key: 'Thu', num: '9', label: 'Thu 9' },
    { key: 'Fri', num: '10', label: 'Fri 10' }
  ];

  // Simulated calendar dragging: shifting an overlapping meeting to later in the afternoon
  const simulateDragAndShift = (id: string) => {
    setShiftedId(id);
    setTimeout(() => {
      const updated = syncedEvents.map(ev => {
        if (ev.id === id) {
          return {
            ...ev,
            time: '3:30 PM - 4:00 PM',
            aiTip: 'SUCCESS: Shifted overlap out of peak focus window. Restored morning focus efficiency.'
          };
        }
        return ev;
      });
      setSyncedEvents(updated);
      onShiftEvent(id, '3:30 PM - 4:00 PM');
      setShiftedId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Upper header action controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-500" />
            <span>Synced Weekly Calendar Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review your synced schedules from Google, iCloud, or Outlook. Shift meetings with one click to protect deep focus boundaries.
          </p>
        </div>

        {/* Navigation arrow toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">July 6 - July 10, 2026</span>
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week selection columns */}
      <div className="grid grid-cols-5 gap-3">
        {weekDays.map((day) => (
          <button
            key={day.key}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              day.active 
                ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold shadow-sm' 
                : 'bg-white/50 dark:bg-slate-950/30 border-slate-200/40 dark:border-slate-800/60 text-slate-500 hover:bg-white dark:hover:bg-slate-950'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider font-mono font-medium">{day.key}</div>
            <div className="text-lg mt-0.5">{day.num}</div>
          </button>
        ))}
      </div>

      {/* Active Day Slots */}
      <div className="space-y-4">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-1">Today's Schedule Slots</div>

        <div className="space-y-3">
          {syncedEvents.map((event) => {
            const isOverlap = event.id === 'c-2';
            const isShifted = shiftedId === event.id;

            return (
              <div 
                key={event.id}
                className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-300 hover:shadow-md relative overflow-hidden"
              >
                {/* Visual Accent bar depending on colors */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: event.color }}
                ></div>

                <div className="space-y-1 pl-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{event.time}</span>
                    <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-bold">{event.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{event.title}</h4>
                </div>

                {/* AI Advice Callout */}
                {event.aiTip && (
                  <div className="flex-1 sm:max-w-md p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-600 dark:text-indigo-400 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse mt-0.5" />
                    <p className="leading-relaxed text-[11px] font-sans">{event.aiTip}</p>
                  </div>
                )}

                {/* Drag-and-drop simulated shift button */}
                <div className="shrink-0 flex items-center justify-end pl-2">
                  {isOverlap ? (
                    <button
                      onClick={() => simulateDragAndShift(event.id)}
                      disabled={isShifted}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-amber-500/10"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{isShifted ? 'RE-SEQUENCING...' : 'PROTECT MORNING FOCUS'}</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">● Protected Block</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Status Footer */}
      <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20 text-xs text-slate-500 flex justify-between items-center font-mono">
        <span>Synced with Calendar Provider</span>
        <span className="text-emerald-500 font-bold">● Active OAuth Token</span>
      </div>

    </div>
  );
}
