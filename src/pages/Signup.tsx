import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { AiFillFacebook } from 'react-icons/ai'
import Seo from '../components/shared/Seo'

const defaultFormFields = {
  email: '',
  name: '',
  username: '',
  password: '',
}

const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, name, username, password } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (event) => {}

  return (
    <>
      <Seo title='Sign up' />
      <div className='flex flex-col gap-5 items-center h-screen bg-base-200'>
        <div className='border flex flex-col pt-16 pb-6 px-10 mt-10 shadow-sm bg-white gap-5 max-w-sm rounded'>
          <div className='w-full flex justify-center h-8 mb-1'>
            <img src={logo} alt='logo' />
          </div>

          <h3 className='font-bold text-xl text-gray-500 text-center'>
            Sign up to see photos and videos from your friends.
          </h3>

          <button
            type='button'
            className='gap-2 bg-primary py-1 w-64 mx-auto rounded'
          >
            <div className='flex justify-center w-full items-center gap-2 '>
              <AiFillFacebook color='white' size={22} />{' '}
              <Link
                to='/'
                className='font-bold text-sm tracking-wide text-white'
              >
                Log in with Facebook
              </Link>
            </div>
          </button>

          <div className='divider text-gray-400 text-sm font-bold p-5'>OR</div>

          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange}
              className='w-64 h-9 pl-2 mx-auto bg-base-200 border-transparent text-sm rounded'
              required
            />
            <input
              type='text'
              placeholder='Full Name'
              name='name'
              value={name}
              onChange={handleChange}
              className='w-64 h-9 pl-2 mx-auto bg-base-200 border-transparent text-sm'
              required
            />
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={handleChange}
              className='w-64 h-9 pl-2 mx-auto bg-base-200 border-transparent text-sm rounded'
              required
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChange}
              className='w-64 h-9 pl-2 mx-auto bg-base-200 border-transparent text-sm rounded'
              required
            />

            <span className='text-xs w-64 text-center mx-auto text-gray-500 mt-4'>
              By signing up, you agree to our{' '}
              <span className='font-bold'>
                Terms, Privacy Policy and Cookies Policy.
              </span>
            </span>
            <button
              type='submit'
              className='text-white font-bold rounded py-1 mt-2 w-64 mx-auto bg-primary border-transparent hover:bg-primary hover:border-transparent disabled:bg-primary disabled:opacity-50 disabled:text-white'
            >
              Sign up
            </button>
          </form>
        </div>

        <div className='border py-6 min-w-[24rem] text-center shadow-sm bg-white gap-5 rounded'>
          Have an account?{' '}
          <Link to='/accounts/login' className='text-primary font-bold'>
            Log in
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signup
