"use client"

import EditorNavBar from '@/components/EditorNavBar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'sonner';

const Page = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isNewNote, setIsNewNote] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter();
  const params = useParams();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialDataRef = useRef({ title: "", content: "" });

  const noteId = params.id as string;
  const playSound = () => {
  const audio = new Audio("/sound/mixkit-single-key-type-2533.wav");
  audio.play();
};

  // Fetch existing note
  const fetchNote = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(`/api/note/${id}`);
      
      if (res.data.success) {
        const note = res.data.note;
        console.log(note)
        setTitle(note.title || "");
        setContent(note.body || "");
        initialDataRef.current = { title: note.title || "", content: note.body || "" };
        setHasUnsavedChanges(false);
      } else {
        setError("Failed to fetch note");
        toast.error("Failed to load note");
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      setError("Error loading note");
      toast.error("Error loading note");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if there are unsaved changes
  const checkForUnsavedChanges = useCallback(() => {
    const hasChanges = 
      title !== initialDataRef.current.title || 
      content !== initialDataRef.current.content;
    setHasUnsavedChanges(hasChanges);
    return hasChanges;
  }, [title, content]);

  // Auto-save functionality
  // const autoSave = useCallback(() => {
  //   if (autoSaveTimeoutRef.current) {
  //     clearTimeout(autoSaveTimeoutRef.current);
  //   }
    
  //   autoSaveTimeoutRef.current = setTimeout(() => {
  //     if (checkForUnsavedChanges() && (title.trim() || content.trim())) {
  //       saveNote(true); // Pass true for auto-save
  //     }
  //   }, 2000); // Auto-save after 2 seconds of inactivity
  // }, [title, content]);



  // Save note function
  const saveNote = async (isAutoSave = false) => {
    if (!title.trim() && !content.trim()) {
      if (!isAutoSave) {
        toast.error("Cannot save empty note");
      }
      return;
    }

    try {
      setIsSaving(true);
      let res;

      if (isNewNote) {
        res = await axios.post("/api/note/create-note", {
          title: title.trim(),
          body: content
        });

        if (!res.data.success) {
          toast.error("Failed to create note");
          if (res.data.error) {
            console.error("Server error:", res.data.error);
          }
          throw new Error('Failed to save note');
        }

        const newNoteId = res.data.noteId;
        
        // Update URL to reflect the new note ID
        router.replace(`/editor/${newNoteId}`);
        
        setIsNewNote(false);
        initialDataRef.current = { title: title.trim(), content };
        setHasUnsavedChanges(false);
        
        if (!isAutoSave) {
          toast.success("Note created successfully!");
        }

      } else {
        res = await axios.put("/api/note/update-note", {
          updatedTitle: title.trim(),
          updatedBody: content,
          noteId: noteId
        });

        if (!res.data.success) {
          toast.error("Failed to update note");
          if (res.data.error) {
            console.error("Server error:", res.data.error);
          }
          throw new Error('Failed to update note');
        }

        initialDataRef.current = { title: title.trim(), content };
        setHasUnsavedChanges(false);
        
        if (!isAutoSave) {
          toast.success("Note saved successfully!");
        }
      }
      
      setError(null);
    } catch (err) {
      if (!isAutoSave) {
        toast.error("Failed to save note");
      }
      setError('Failed to save note');
      console.error('Error saving note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async() => {
    try {
      setIsDeleting(true);

      const res = await axios.post(`/api/note/delete-note`, {
       noteId
      });

      console.log(res);
      if(res.data.success){
        toast.success("removed successfully")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("somethis went wrong")
      console.log(error)
      
    }finally{
      setIsDeleting(false)
    }
  }

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
     setTimeout(() => {
      playSound();
    }, 200);
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveNote();
    }
  };
    const handleTitleKeyDown = () => {
    setTimeout(() => {
      playSound();
    }, 200);
  };

  // Initialize component
  useEffect(() => {
    if (noteId === 'new' || !noteId) {
      setIsNewNote(true);
      setLoading(false);
      initialDataRef.current = { title: "", content: "" };
    } else {
      setIsNewNote(false);
      fetchNote(noteId);
    }
  }, [noteId, fetchNote]);

  // Check for unsaved changes when title or content changes
  useEffect(() => {
    if (!loading) {
      checkForUnsavedChanges();
      // autoSave();
    }
  }, [title, content, loading, checkForUnsavedChanges, ]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl">Loading note...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => router.push('/home')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center bg-white dark:bg-neutral-900'>
      <EditorNavBar 
        onSubmitClick={() => saveNote()} 
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        deleteDiabled={isDeleting}
        onDelete={deleteNote}
        isDeleting={isDeleting}
      />

      <main className='w-[100%] h-[100%] rounded-md overflow-y-scroll flex flex-col items-center dark:bg-neutral-800 '>
        <div className='min-h-[600px] w-[60%] border-2 mt-10 rounded-md note-shadow bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-500 p-8 flex flex-col '>
          {/* Title */}
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="Note title..."
            className="text-3xl text-black rounded w-full font-bold dark:text-neutral-200  border border-neutral-300 focus:ring-0 outline-none dark:border-neutral-600 shadow-none p-2 mb-6 bg-transparent focus-visible:ring-0"
            onKeyDown={handleKeyDown}
          />

          {/* Content */}
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your thoughts..."
            onKeyDown={handleKeyDown}
            className="min-h-[400px] text-lg  bg-transparent border-none text-black outline-none focus:ring-0 dark:text-neutral-200 shadow-none p-1  resize-none focus-visible:ring-0 leading-7"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, rgba(71, 70, 70, 0.911) 27px, rgba(71, 70, 70, 0.911) 28px)",
              lineHeight: "28px",
            }}
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 handwritten text-sm">
            {hasUnsavedChanges 
              ? "Auto-saving... Use Ctrl+S to save manually" 
              : "Tip: Use Ctrl+S to save quickly, or let your thoughts flow freely"
            }
          </p>
          {isSaving && (
            <p className="text-blue-500 handwritten text-xs mt-1">
              Saving...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Page;