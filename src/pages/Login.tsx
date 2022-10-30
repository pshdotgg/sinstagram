import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { AiFillFacebook } from 'react-icons/ai'
import Seo from '../components/shared/Seo'

const Login = () => {
  return (
    <>
      <Seo title='Log in' />
      <div className='flex flex-col gap-5 items-center h-screen bg-base-200'>
        <div className='border flex flex-col pt-16 pb-6 px-10 mt-20 shadow-sm bg-white gap-5 rounded'>
          <div className='w-full flex justify-center h-8 mb-10'>
            <img src={logo} alt='logo' />
          </div>

          <form className='flex flex-col gap-2'>
            <input
              type='email'
              placeholder='Phone number, username, or email'
              className='w-64 h-9 m-auto bg-base-200 border-transparent text-sm'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-64 h-9 m-auto bg-base-200 border-transparent text-sm'
            />
            <button
              disabled
              type='submit'
              className='text-white font-bold rounded py-1  mt-2 bg-primary border-transparent hover:bg-primary hover:border-transparent disabled:bg-primary disabled:opacity-50 disabled:text-white'
            >
              Log in
            </button>
          </form>
          <div className='divider text-gray-400 text-sm font-bold'>OR</div>
          <button type='button' className='flex items-center gap-2 m-auto'>
            <AiFillFacebook color='#4267B2' size={22} />{' '}
            <Link
              to='/'
              className='text-[#4267b2] font-bold text-sm tracking-wide'
            >
              Log in with Facebook
            </Link>
          </button>
          <Link to='/' className='text-sm text-center text-[#4267b2]'>
            Forgot Password?
          </Link>
        </div>

        <div className='border py-6 px-14 shadow-sm bg-white gap-5 rounded'>
          Don't have an account?{' '}
          <Link to='/accounts/emailsignup' className='text-primary font-bold'>
            Sign up
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
