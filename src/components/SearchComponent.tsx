// components/SearchComponent.tsx (Complete with results display)
"use client"

import { useSearchStore } from '@/stores/useSearchStore'
import { Search, FileText, Calendar, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchComponent = () => {
  const [query, setQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { isOpen, closeSearch, searchNote, results, isLoading, clearResult } = useSearchStore();

  const router = useRouter();


  
  const handleEventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  
  const handleNoteClick = (noteId: string) => {
    // Handle note selection - you can navigate to the note here
    console.log('Selected note:', noteId)
    closeSearch()
    router.push(`/editor/${noteId}`)
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substr(0, maxLength) + '...'
  };

  const clearSearch = ()=>{
    setQuery('');
    clearResult();
  }
  
    useEffect(() => {
    setIsMounted(true)
  }, []);
 

  useEffect(() => {
    if (!isOpen || !isMounted || query.length===0) return 
    const delayedStart = setTimeout(() => {
      searchNote(query, "title")
    }, 500)
    
    return () => {
      clearTimeout(delayedStart)
    }
  }, [query, searchNote])
  
  if (!isOpen) return null
  return (
    <div 
    className='h-screen w-screen fixed inset-0 flex items-center justify-center bg-black/50 z-50' 
    onClick={() => closeSearch()}
    >
      <div 
        className='h-[50%] sm:h-[80%] w-[90%] sm:w-[40%] bg-white dark:bg-neutral-800  rounded-md shadow-lg shadow-gray-400 flex flex-col p-4' 
        onClick={handleEventPropagation}
        >
        {/* Close button */}
        <button 
          onClick={closeSearch}
          className='absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors'
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          >
          <X className='w-5 h-5 text-gray-500' />
        </button>

        {/* Search Input */}
        <div className='w-full h-12 border-neutral-300 dark:border-neutral-600 dark:text-neutral-300 border-2 rounded-md p-1 bg-neutral-200 dark:bg-neutral-700 flex items-center px-2 mb-4'>
          <Search className='size-5 text-neutral-600 dark:text-neutral-400 mr-2' />
          <input 
            type="text" 
            className='h-full flex-1 outline-none p-2 bg-transparent' 
            placeholder='Search Notes' 
            value={query} 
            onChange={handleInputValueChange}
            autoFocus
            />
            <X className='size-4 text-neutral-600 dark:text-neutral-400' onClick={clearSearch}/>
        </div>

        {/* Results Area */}
        <div className='flex-1 overflow-hidden flex flex-col'>
          <div className='flex-1 overflow-y-auto'>
            {isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <Loader2 className='w-6 h-6 animate-spin text-blue-500 mr-2' />
                <span className='text-gray-600'>Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className='space-y-2'>
                {results.map((note) => (
                  <div
                    key={note._id}
                    className='p-3 border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-600 cursor-pointer transition-colors'
                    onClick={() => handleNoteClick(note._id)}
                  >
                    <div className='flex items-start gap-3'>
                      <FileText className='w-5 h-5 text-gray-400 mt-1 flex-shrink-0' />
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-gray-900 dark:text-neutral-300 mb-1 truncate'>
                          {note.title || 'Untitled Note'}
                        </h3>
                        <p className='text-sm text-gray-600 dark:text-neutral-400 mb-2 line-clamp-2'>
                          {truncateContent(note.body)}
                        </p>
                        <div className='flex items-center text-xs text-gray-400'>
                          <Calendar className='w-3 h-3 mr-1' />
                          {formatDate(note.updatedAt || note.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                <FileText className='w-12 h-12 mb-3 text-gray-300' />
                <p>No notes found for "{query}"</p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                <Search className='w-12 h-12 mb-3 text-gray-300' />
                <p>Start typing to search your notes...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent