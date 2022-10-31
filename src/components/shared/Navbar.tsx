import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import logo from '../../images/logo.png'
import LoadingSpinner from './LoadingSpinner'
import { MdCancel } from 'react-icons/md'

const Navbar = () => {
  return (
    <div className='border-b-2 px-5'>
      <nav className='bg-white flex items-center max-w-5xl justify-between mx-auto gap-5 py-3'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <Search />
        <div className='flex gap-2'>
          <Link to='/accounts/login'>
            <button
              type='button'
              className='btn bg-primary hover:bg-primary hover:border-transparent border-transparent text-white btn-sm normal-case rounded'
            >
              Log In
            </button>
          </Link>

          <Link to='/accounts/emailsignup'>
            <button
              type='button'
              className='btn btn-link btn-sm text-primary no-underline  normal-case'
            >
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

const Search = () => {
  const [query, setQuery] = useState('')
  const [hasFocus, setHasFocus] = useState(false)
  let loading = false

  const handleClearInput = () => {
    setQuery('')
  }

  return (
    <div className='hidden md:block relative'>
      {!(hasFocus || query) && (
        <span className='text-gray-400 flex items-center absolute top-1.5 left-2'>
          <FaSearch className='fill-gray-400 focus:hidden' size={15} />
          <span className='pl-2'>Search</span>
        </span>
      )}
      <input
        type='text'
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className='input input-sm max-w-xs bg-base-200 text-base w-54 h-9 focus:outline-transparent focus:border-transparent '
      />
      {loading ? (
        <span className='absolute right-2 top-2.5'>
          <LoadingSpinner size={15} className='fill-gray-400' />
        </span>
      ) : (
        (hasFocus || query) && (
          <span className='absolute right-2 top-2.5' onClick={handleClearInput}>
            <MdCancel className='fill-gray-400' size={15} />
          </span>
        )
      )}
    </div>
  )
}

export default Navbar
