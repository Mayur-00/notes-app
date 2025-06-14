'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note>({
    id: '',
    title: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const noteId = params.id as string;
    
    if (noteId === "new") {
      setIsNewNote(true);
      setNote({
        id: '',
        title: 'Untitled Note',
        content: 'Start writing your note here...'
      });
      setIsLoading(false);
    } else {
      fetchNote(noteId);
    }
  }, [params.id]);

  const fetchNote = async (noteId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/note/${noteId}`);
      
      if (!response.data.success) {
        throw new Error('Failed to fetch note');
      }
      
      setNote(response.data.note);
    } catch (err) {
      setError('Failed to load note');
      console.error('Error fetching note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    try {
      setIsSaving(true);
      const noteId = params.id as string;
      let savedNote;
      let res;

      if (isNewNote) {
        console.log(note.title, note.content);
        res = await axios.post("/api/note/create-note", {
          title: note.title,
          body: note.content
        });

        if (!res.data.success) {
          throw new Error('Failed to save note');
        }

        savedNote = res.data.note;
        setNote(savedNote);
        setIsNewNote(false);
        router.push(`/note/see/${savedNote._id}`);
      } else {
        res = await axios.put("/api/notes/update-note", {
          updatedTitle: note.title,
          updatedBody: note.content,
          noteId: noteId
        });

        if (!res.data.success) {
          throw new Error('Failed to update note');
        }

        savedNote = res.data.note;
        setNote(savedNote);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    console.log(content);
    setNote(prev => ({ ...prev, content }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveNote();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={note.title}
                onChange={handleTitleChange}
                className="text-3xl font-bold text-gray-900 border-none outline-none bg-transparent w-full"
                placeholder="Note title..."
              />
              {note.updatedAt && (
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveNote}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  'Save Note'
                )}
              </button>
              <button
                onClick={() => router.push('/notes')}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back to Notes
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Note Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <textarea
            value={note.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            className="w-full min-h-96 outline-none text-gray-900 leading-relaxed text-lg resize-none border-none bg-transparent"
            placeholder="Start writing your note here..."
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Press Ctrl+S to save • Click outside to auto-save</p>
        </div>
      </div>
    </div>
  );
}