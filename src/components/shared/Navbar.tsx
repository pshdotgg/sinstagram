import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

const Navbar = () => {
  return (
    <div className='border-b'>
      <nav className='bg-white flex items-center max-w-screen-lg justify-between mx-auto gap-5 py-3'>
        <div>
          <img src={logo} alt='logo' />
        </div>
        <div>
          <input
            type='text'
            placeholder='Search'
            className='input input-sm input-bordered max-w-xs bg-base-200 text-base w-54 h-9 focus:outline-transparent focus:border-transparent'
          />
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            className='btn bg-[#0095F6] hover:bg-[#0095F6] hover:border-transparent border-transparent text-white btn-sm normal-case rounded'
          >
            Log In
          </button>
          <button
            type='button'
            className='btn btn-link btn-sm text-[#0095F6] no-underline  normal-case'
          >
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
