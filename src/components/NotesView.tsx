import { useState, useEffect } from 'react';
import { 
  PenSquare, 
  Search, 
  Pin, 
  Sparkles, 
  Trash2, 
  Plus, 
  Tag, 
  CheckCircle2,
  FileText,
  Mic,
  MicOff,
  AlertCircle
} from 'lucide-react';
import { NoteItem } from '../types';

interface NotesViewProps {
  notes: NoteItem[];
  onAddNote: (newNote: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
  onUpdateNoteSummary: (id: string, summary: string) => void;
}

export default function NotesView({
  notes,
  onAddNote,
  onDeleteNote,
  onTogglePin,
  onUpdateNoteSummary
}: NotesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(notes[0] || null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // States for writing new notes
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTagsString, setNewTagsString] = useState('');

  const [isSummarizing, setIsSummarizing] = useState(false);

  // Voice transcription states
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Clean up recognition stream on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }
    };
  }, [recognition]);

  const toggleRecording = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setVoiceError("Web Speech API is not supported in this browser. Please use Chrome, Safari, or Edge.");
      return;
    }

    if (isRecording) {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }
      setIsRecording(false);
    } else {
      setVoiceError(null);
      try {
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsRecording(true);
        };

        rec.onresult = (event: any) => {
          let chunkTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              chunkTranscript += event.results[i][0].transcript;
            }
          }
          if (chunkTranscript) {
            setNewContent(prev => prev + (prev ? ' ' : '') + chunkTranscript);
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setVoiceError(`Mic error: ${event.error}`);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        rec.start();
        setRecognition(rec);
      } catch (err: any) {
        setVoiceError("Microphone initialization failed.");
        setIsRecording(false);
      }
    }
  };

  // Generate dynamic tags list
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  // Filter notes based on query and tag
  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? n.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleCreateNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const tags = newTagsString
      ? newTagsString.split(',').map(t => t.trim()).filter(Boolean)
      : ['General'];

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const fresh: NoteItem = {
      id: `n-${Date.now()}`,
      title: newTitle,
      content: newContent,
      tags: tags,
      date: dateStr,
      pinned: false
    };

    onAddNote(fresh);
    setSelectedNote(fresh);
    
    // Reset forms
    setNewTitle('');
    setNewContent('');
    setNewTagsString('');
  };

  const handleSimulateAISummary = (noteId: string, contentText: string) => {
    setIsSummarizing(true);
    setTimeout(() => {
      // Mock AI synthesis based on content text
      let generatedSummary = 'Core summary details extracted...';
      if (contentText.toLowerCase().includes('glassmorphism')) {
        generatedSummary = 'Focuses on designing high-fidelity glass components with 24px rounded corners and charcoal/indigo gradient aesthetics.';
      } else if (contentText.toLowerCase().includes('deep focus')) {
        generatedSummary = 'Sets critical constraints for daily schedule structuring: Morning deep coding blocks and post-lunch recovery slots.';
      } else {
        generatedSummary = `Extracted synthesis: ${contentText.split('.').slice(0, 2).join('. ')}.`;
      }

      onUpdateNoteSummary(noteId, generatedSummary);
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote({
          ...selectedNote,
          summary: generatedSummary
        });
      }
      setIsSummarizing(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
      
      {/* Left Column: Notes directory sidebar */}
      <div className="md:col-span-5 flex flex-col h-full border border-slate-200/50 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 overflow-hidden">
        
        {/* Search header row */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-900 space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-slate-400 uppercase">Documents Cabinet</h3>
            <span className="text-[10px] font-mono text-indigo-500 font-bold">{notes.length} notes active</span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search note contents..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Tags cloud selection bar */}
          <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
              }`}
            >
              ALL
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                }`}
              >
                #{tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Directory scrolling space */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900/60 scrollbar-thin">
          {filteredNotes.map((note) => {
            const isSelected = selectedNote?.id === note.id;
            return (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-indigo-500' 
                    : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/30'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{note.title}</h4>
                  <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => onTogglePin(note.id)}
                      className={`text-slate-400 hover:text-indigo-500 ${note.pinned ? 'text-indigo-500' : ''} cursor-pointer`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDeleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {note.content}
                </p>

                <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-slate-400">
                  <span>{note.date}</span>
                  <div className="flex gap-1">
                    {note.tags.slice(0, 2).map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-400 text-[8px] font-bold uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Note bottom panel trigger */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-950/20 flex flex-col gap-2">
          <button 
            onClick={() => setSelectedNote(null)}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Document</span>
          </button>

          <button 
            onClick={() => {
              setSelectedNote(null);
              setTimeout(() => {
                toggleRecording();
              }, 150);
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mic className="w-4 h-4 text-indigo-500" />
            <span>Dictate Quick Note</span>
          </button>
        </div>

      </div>

      {/* Right Column: Note Workspace details */}
      <div className="md:col-span-7 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col h-full overflow-hidden">
        {selectedNote ? (
          /* Editor / viewer Workspace */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Header toolbar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>{selectedNote.date}</span>
                <span>•</span>
                <span>{selectedNote.tags.join(', ')}</span>
              </div>

              {/* Summarize button trigger */}
              <button
                onClick={() => handleSimulateAISummary(selectedNote.id, selectedNote.content)}
                disabled={isSummarizing}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSummarizing ? 'animate-spin' : ''}`} />
                <span>{isSummarizing ? 'Synthesizing...' : 'Summarize with AI'}</span>
              </button>
            </div>

            {/* Editing canvas */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {selectedNote.title}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {selectedNote.content}
              </p>

              {/* Render AI summary badge overlay */}
              {selectedNote.summary && (
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2 relative overflow-hidden animate-slide-down">
                  <div className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI REPLAY DIGEST</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedNote.summary}
                  </p>
                </div>
              )}

            </div>

          </div>
        ) : (
          /* Creating form Workspace */
          <div className="flex flex-col h-full p-6 justify-between">
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-900">
                <PenSquare className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Write New Document Draft</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Document Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Brainstorming modular React helpers..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Note Tags (separated by commas)</label>
                <input 
                  type="text" 
                  value={newTagsString}
                  onChange={(e) => setNewTagsString(e.target.value)}
                  placeholder="e.g. Design, UI, SaaS"
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Workspace content canvas</label>
                  <button 
                    type="button"
                    onClick={toggleRecording}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isRecording 
                        ? 'bg-rose-500 border-rose-600 text-white shadow-md shadow-rose-500/20' 
                        : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-950/60 hover:bg-indigo-100/80 dark:hover:bg-indigo-950/80'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>Stop Dictation</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        <span>Dictate Thoughts</span>
                      </>
                    )}
                  </button>
                </div>

                {voiceError && (
                  <div className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/15 text-[10px] text-rose-500 flex items-center gap-1.5 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{voiceError}</span>
                  </div>
                )}

                {isRecording && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-500 flex items-center gap-2">
                    <span className="flex gap-0.5 items-end h-2 shrink-0">
                      <span className="w-0.5 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-0.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-0.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </span>
                    <span>Listening... speak now. Transcribed words append directly into your document draft below.</span>
                  </div>
                )}

                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={8}
                  placeholder="Type or dictate your thoughts here..."
                  className="w-full flex-1 px-4 py-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500 resize-none font-sans"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2 shrink-0">
              <button 
                onClick={() => setSelectedNote(notes[0])}
                className="px-4 py-2 rounded-xl text-slate-500 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
              >
                Discard
              </button>
              <button 
                onClick={handleCreateNote}
                className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/10 cursor-pointer"
              >
                Save Document
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
