import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai'
import logo from '../../images/logo.png'
import LoadingSpinner from './LoadingSpinner'
import { MdCancel } from 'react-icons/md'
import { defaultCurrentUser } from '../../data'

const Navbar = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className='border-b-2 px-5'>
      <nav className='bg-white flex items-center max-w-5xl justify-between mx-auto gap-5 py-3'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <Search />
        <NavLinks path={path} />
        {/* <div className='flex gap-2'>
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
        </div> */}
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

const NavLinks = ({ path }) => {
  const [showNotifications, setShowNotifications] = useState(false)

  const handleToggleNotifications = () => {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications)
  }
  return (
    <div>
      <div className='flex gap-5 items-center'>
        <Link to='/'>
          {path === '/' ? (
            <AiFillHome size={25} />
          ) : (
            <AiOutlineHome size={25} />
          )}
        </Link>
        <Link to='/explore'>
          {path === '/explore' ? (
            <AiFillCompass size={25} />
          ) : (
            <AiOutlineCompass size={25} />
          )}
        </Link>
        <div className='cursor-pointer' onClick={handleToggleNotifications}>
          {showNotifications ? (
            <AiFillHeart size={25} />
          ) : (
            <AiOutlineHeart size={25} />
          )}{' '}
        </div>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div className='avatar flex justify-center items-center'>
            <div
              className={`w-7 rounded-full ${
                path === `/${defaultCurrentUser.username}` &&
                'border-2 border-gray-700 ring-offset-2 ring-offset-base-100'
              }`}
            >
              <img src={defaultCurrentUser.profile_image} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
