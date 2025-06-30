"use client"

import { Search, Settings } from 'lucide-react'
import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import { useSearchStore } from '@/stores/useSearchStore'
import Link from 'next/link'
import { ModeToggle } from './ThemeToggler'

const NavBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

const {openSearch} =  useSearchStore()

  const searchClickHandler = ()=> {
    openSearch()
  }
  return (
    <nav className='h-[10%] md:h-[15%] w-full border shadow-lg flex items-center justify-between px-5 md:px-20 ' >
        <h1 className='font-bold md:text-3xl text-lg text-black dark:text-neutral-200 '>Paper Notes</h1>

        <div className='flex gap-5 items-center'>
            <ModeToggle />
            <button onClick={searchClickHandler}  className='flex bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black dark:text-neutral-300 border-1 border-black hover:bg-neutral-200  rounded justify-center items-center gap-1 md:h-10 md:w-30 h-10 w-25'>
                <Search className='size-5 '/><span>Search</span>
            </button>
        </div>

    </nav>
  )
}

export default NavBar