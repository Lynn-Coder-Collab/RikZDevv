"use client";

import { useState } from "react";
import { NotebookPen, Save, Plus, FileText, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const MOCK_NOTES: Note[] = [
  { id: "1", title: "React Context API", content: "Remember to wrap providers properly. Context avoids prop drilling.", updatedAt: "2 May 2026" },
  { id: "2", title: "OAuth Flows", content: "Implicit vs Auth Code flow. Always use PKCE for SPAs.", updatedAt: "1 May 2026" }
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [activeNote, setActiveNote] = useState<Note | null>(notes[0]);

  const handleSave = () => {
    if (!activeNote) return;
    setNotes(prev => prev.map(n => n.id === activeNote.id ? activeNote : n));
    alert("Note saved successfully!");
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      updatedAt: "Just now"
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (activeNote?.id === id) setActiveNote(updated[0] || null);
  };

  return (
    <div className="h-[85vh] flex gap-6 animate-in fade-in duration-500">
      {/* Sidebar for Notes */}
      <div className="w-80 flex flex-col border border-white/10 rounded-2xl bg-[#111] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotebookPen className="w-5 h-5 text-[#FF6321]" />
            <h2 className="font-medium text-white">Your Notes</h2>
          </div>
          <button 
            onClick={createNote}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`w-full text-left p-3 rounded-xl flex flex-col gap-1 transition-colors group ${
                activeNote?.id === note.id ? 'bg-[#FF6321]/10 border border-[#FF6321]/20' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <span className={`font-medium ${activeNote?.id === note.id ? 'text-[#FF6321]' : 'text-gray-300'}`}>{note.title || "Untitled"}</span>
                <Trash2 
                  className="w-4 h-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => deleteNote(note.id, e)}
                />
              </div>
              <span className="text-xs text-gray-500">{note.updatedAt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Main */}
      <div className="flex-1 bg-[#111] border border-white/10 rounded-2xl flex flex-col relative overflow-hidden">
        {activeNote ? (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6321]/5 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none"></div>
            <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10">
              <input 
                type="text" 
                value={activeNote.title}
                onChange={(e) => setActiveNote({...activeNote, title: e.target.value})}
                className="bg-transparent text-2xl font-display font-medium text-white focus:outline-none w-full"
                placeholder="Note Title"
              />
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black font-medium text-sm rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors shrink-0"
              >
                <Save className="w-4 h-4" />
                Save Note
              </button>
            </div>
            <div className="flex-1 p-6 relative z-10">
              <textarea 
                value={activeNote.content}
                onChange={(e) => setActiveNote({...activeNote, content: e.target.value})}
                className="w-full h-full bg-transparent resize-none text-gray-300 focus:outline-none leading-relaxed text-lg"
                placeholder="Start typing your notes here..."
              ></textarea>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <FileText className="w-16 h-16 opacity-20 mb-4" />
            <p>Select a note or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
