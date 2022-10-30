import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

const Navbar = () => {
  return (
    <div className='border-b-2 px-5'>
      <nav className='bg-white flex items-center max-w-5xl justify-between mx-auto gap-5 py-3'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <div>
          <input
            type='text'
            placeholder='Search'
            className='input input-sm max-w-xs bg-base-200 text-base w-54 h-9 focus:outline-transparent focus:border-transparent ml-10 hidden md:block'
          />
        </div>
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

export default Navbar
