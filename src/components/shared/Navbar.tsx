import React, { useEffect, useState, useRef } from 'react'
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
import { RiArrowUpSFill } from 'react-icons/ri'
import logo from '../../images/logo.png'
import LoadingSpinner from './LoadingSpinner'
import { MdCancel } from 'react-icons/md'
import { defaultCurrentUser, getDefaultUser } from '../../data'
import UserCard from './UserCard'
import NotificationTooltip from '../notifications/NotificationTooltip'
import NotificationList from '../notifications/NotificationList'
import useOutsideClick from '@rooks/use-outside-click'
import { useNProgress } from '@tanem/react-nprogress'

const Navbar = () => {
  const location = useLocation()
  const path = location.pathname
  const [isLoadingPage, setIsLoadingPage] = useState(true)

  useEffect(() => {
    setIsLoadingPage(false)
  }, [path])

  return (
    <div className='md:fixed bg-white w-full z-20'>
      <PrograssBar isAnimating={isLoadingPage} />
      <div className='border-b-2 px-5 '>
        <nav className='bg-white flex items-center max-w-5xl justify-between mx-auto gap-5 py-3 '>
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
    </div>
  )
}

const Search = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [results, setResults] = useState([])

  const hasResults = query && results.length > 0

  useEffect(() => {
    if (!query.trim()) return

    setLoading(true)
    setResults(Array.from({ length: 5 }, () => getDefaultUser()))
    setLoading(false)
  }, [query])

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
      {hasResults && <SearchCard results={results} />}
    </div>
  )
}

const SearchCard = ({ results }) => {
  return (
    <div className='absolute top-8 w-full flex flex-col gap-0 justify-center items-center m-0'>
      <RiArrowUpSFill size={50} className='fill-white p-0' />
      <div className='card w-full bg-base-100 shadow-xl rounded -mt-5'>
        <div className='card-body p-0 m-0'>
          {results.map((result) => {
            return (
              <div key={result.id}>
                <Link to={`/${result.username}`}>
                  <div className='cursor-pointer hover:bg-base-300 p-4 pb-0 -mt-2'>
                    <UserCard user={result} />
                  </div>
                </Link>
                <div className='divider -m-2'></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const NavLinks = ({ path }) => {
  const [showNotificationsTooltip, setShowNotificationsTooltip] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationListRef = useRef(null)

  const handleToggleNotifications = () => {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications)
  }

  const handleHideNotificationsTooltip = () => {
    setShowNotificationsTooltip(false)
  }

  const handleHideNotificationsList = () => {
    setShowNotifications(false)
  }

  // useOutsideClick(notificationListRef, handleHideNotificationsList)

  useEffect(() => {
    const timeout = setTimeout(handleHideNotificationsTooltip, 2500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className='flex gap-5 items-center'>
      <Link to='/'>
        {path === '/' ? <AiFillHome size={28} /> : <AiOutlineHome size={28} />}
      </Link>
      <Link to='/explore'>
        {path === '/explore' ? (
          <AiFillCompass size={28} />
        ) : (
          <AiOutlineCompass size={28} />
        )}
      </Link>
      <div className='cursor-pointer relative' ref={notificationListRef}>
        <div
          onClick={() => {
            handleHideNotificationsTooltip()
            handleToggleNotifications()
          }}
        >
          {showNotifications ? (
            <AiFillHeart size={28} />
          ) : (
            <AiOutlineHeart size={28} />
          )}{' '}
        </div>
        {showNotificationsTooltip && (
          <NotificationTooltip className='absolute -left-9 animate-ping-once' />
        )}
        {showNotifications && <NotificationList className='-right-3 top-8' />}
      </div>

      <Link to={`/${defaultCurrentUser.username}`}>
        <div className='avatar flex justify-center items-center'>
          <div
            className={`w-10 rounded-full border-2 border-transparent ${
              path === `/${defaultCurrentUser.username}` &&
              'border-gray-700 ring-offset-base-100 ring-offset-1'
            }`}
          >
            <img
              src={defaultCurrentUser.profile_image}
              className='rounded-full'
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

const PrograssBar = ({ isAnimating }) => {
  const { animationDuration, progress, isFinished } = useNProgress({
    isAnimating,
  })

  return (
    <div
      className={`${
        isFinished ? 'opacity-0' : 'opacity-100'
      } absolute z-20 w-full`}
    >
      <div
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
          background:
            '#27c4f5 linear-gradient(to right,#24c4e5,#a307bb,#fd8e32,#70b060,#24c4e5)',
          backgroundSize: '500%',
        }}
        className={`h-1 w-full`}
      ></div>
    </div>
  )
}

export default Navbar
