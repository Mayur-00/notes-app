"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

const NotesGrid = () => {

  const [notes, setNotes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>();

  const router = useRouter();

  // Function to truncate text to specified word count
  const truncateText = (text:string, wordLimit = 20) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Function to format date to relative time
  const getRelativeTime = (dateString:any) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Fetch all notes (initial load)
  const fetchNotes = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);

      const response = await axios.get(`/api/note/get-notes`);

      if (response.data.success) {
        setNotes(response.data.notes);
        console.log('Fetched notes:', response.data.notes);
      }
      
    } catch (error:any) {
      toast.error("Can't get notes");
      setError(error.message);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleNoteClick = (noteId:any) => {
    toast.success("redirecting");
    router.push(`editor/${noteId}`)
  };






  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (isFetching) {
    return (
      <div className="w-full">
   
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading notes...</div>
        </div>
      </div>
    );
  }

 
  

  return (
    <div className="w-full">
      {/* Search Input */}
     

      {/* Results Summary */}
     

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-lg mb-2">
           'No notes available
          </div>
          <div className="text-sm">
            'Create your first note to get started
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note:any) => (
            <div key={note._id} onClick={()=>handleNoteClick(note._id)} className='h-52 w-full max-w-96 bg-white dark:bg-neutral-700 border-2 hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-neutral-700 relative rounded-lg cursor-pointer'>
              <div className='p-5'>
                <h1 className='font-bold text-xl p-1 mb-2 line-clamp-2 text-black dark:text-neutral-300'>{note.title}</h1>
                <p className='text-gray-600 dark:text-neutral-400 text-sm leading-relaxed'>
                  {truncateText(note.body, 20)}
                </p>
              </div>
              <div className='absolute bottom-4 right-4'>
                <span className='text-gray-400 text-sm'>
                  {getRelativeTime(note.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default NotesGrid;