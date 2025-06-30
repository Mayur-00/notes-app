import { ArrowLeft, Loader2, Save, SaveAll, SaveOff, Settings, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { object } from 'zod'

const EditorNavBar = ({onSubmitClick, isSaving, hasUnsavedChanges, deleteDiabled, onDelete, isDeleting}:any) => {

    const handleClick = async()=> {
        onSubmitClick();
    }
  return (
    <nav className='h-[10%] md:h-[15%] w-full border shadow-lg flex items-center bg-white dark:bg-neutral-900 justify-between px-5 md:px-20' >
        <h1 className=' '>
            <Link href={'/dashboard'} className='flex items-center justify-center text-black dark:text-neutral-500 text-md gap-3'>
            <ArrowLeft className='size-5'/> <span> Back To Notes</span>
            </Link>
        </h1>
        <div className='flex gap-5 items-center'>
            
            <button onClick={handleClick} className='flex bg-white dark:bg-neutral-700  text-black dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-600 border-1 border-black   rounded justify-center items-center gap-1 md:h-10 md:w-30 h-10 w-25 cursor-pointer'>
              {
                isSaving && (
                  <Loader2 className='animate-spin size-5'/>
                )
              }

              <Save className={`size-5 ${hasUnsavedChanges?"animate-bounce":"animate-none"}`}/>
               <span>save</span>
            </button>
            
            <button disabled={deleteDiabled}  onClick={onDelete} className='flex  justify-center items-center gap-2 md:h-10 md:w-30 h-10 w-25 hover:bg-red-200 bg-red-300 dark:bg-red-200 dark:hover:bg-red-300 rounded text-black cursor-pointer hover:text-black'>
             {isDeleting? ( <Loader2 className='size-5 animate-spin '/> ):( <Trash2 className='size-5 '/> )} <span>  Delete </span>
            </button>
        </div>
    </nav>
  )
}

export default EditorNavBar