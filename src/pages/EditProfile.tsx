import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'
import { defaultCurrentUser } from '../data'
import { getUserDoc } from '../firebase'
import { useUserContext } from '../contexts/userContext'

const EditProfile = () => {
  const [selected, setSelected] = React.useState(0)
  const navigate = useNavigate()
  const { currentUser } = useUserContext()

  return (
    <Layout title='Edit Profile'>
      <h2 className='text-2xl pb-5'>Edit Profile</h2>
      <section className='card bg-white w-full rounded border-2 border-base-300 mx-auto'>
        <div className='card-body p-5 mx-auto md:w-[552px]'>
          <div className='mt-0 flex items-center md:gap-10 mb-5 md:mb-0'>
            <ProfilePicture user={currentUser} />
            <div>
              <span className='font-semibold text-2xl md:text-3xl'>
                {currentUser.username}
              </span>
              <span className='text-primary block cursor-pointer text-xs md:text-base'>
                Change Profile Photo
              </span>
            </div>
          </div>
          <form className='h-full flex flex-col gap-4'>
            <SectionItem label='Name' name='name' value={currentUser.name} />
            <SectionItem
              label='Username'
              name='username'
              value={currentUser.username}
            />
            <SectionItem
              label='Website'
              name='website'
              value={currentUser.website}
            />
            <div className='flex flex-col md:flex-row md:gap-8 md:items-center justify-between'>
              <label htmlFor='bio' className='font-semibold'>
                Bio
              </label>
              <textarea
                name='bio'
                rows={3}
                value={currentUser.bio}
                placeholder='bio'
                className='textarea md:w-96 rounded border-2 border-gray-300 focus:border-primary focus:outline-none focus:bg-white resize-none m-0 overflow-hidden'
              ></textarea>
            </div>
            <div className='md:pl-32'>
              <span className='block text-sm font-semibold text-gray-600'>
                Personal Information
              </span>
              <span className='text-sm text-gray-500'>
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </span>
            </div>
            <SectionItem
              type='email'
              label='Email'
              name='email'
              value={currentUser.email}
            />
            <SectionItem
              label='Phone'
              name='phoneNumber'
              value={currentUser.phone_number}
            />

            <button
              type='submit'
              className='py-3 px-4 mt-1 md:ml-32 bg-primary text-white rounded w-32'
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

const SectionItem = ({ type = 'text', label, name, value }) => {
  return (
    <div className='flex flex-col md:flex-row w-full md:gap-8 md:items-center justify-between'>
      <label
        htmlFor={name}
        className='text-sm md:text-base font-semibold text-left'
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder='Full Name'
        value={value}
        className='pl-2 md:w-96 rounded border-2 border-gray-300 focus:outline-primary focus:bg-white'
      />
    </div>
  )
}

export default EditProfile
