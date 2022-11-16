import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../contexts/userContext'
import isURL from 'validator/lib/isURL'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { setUserDoc, updateUserEmail } from '../firebase'
import handleImageUpload from '../utils/handleImageUpload'

const EditProfile = () => {
  const navigate = useNavigate()
  const { currentUser, currentUserId } = useUserContext()
  const [profileUpdated, setProfileUpdated] = useState(false)
  const [profileImage, setProfileImage] = useState(currentUser.profileImage)
  const { register, handleSubmit } = useForm({ mode: 'onBlur' })

  const onSubmit = async (data) => {
    console.log(data)
    try {
      setProfileUpdated(false)
      await updateUserEmail(data.email)
      await setUserDoc(currentUserId, data)
      setProfileUpdated(true)
      setTimeout(() => {
        setProfileUpdated(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating profile', error)
    }
  }

  const handleUpdateProfilePic = async (event) => {
    const url = await handleImageUpload(event.target.files[0])

    try {
      setProfileUpdated(false)
      await setUserDoc(currentUserId, { profileImage: url })
      setProfileImage(url)
      setProfileUpdated(true)
      setTimeout(() => {
        setProfileUpdated(false)
      }, 2000)
    } catch (error) {
      console.error('Error changing profile photo', error)
    }
  }

  return (
    <Layout title='Edit Profile'>
      <h2 className='text-2xl pb-5'>Edit Profile</h2>
      <section className='card bg-white w-full rounded border-2 border-base-300 mx-auto'>
        <div className='card-body p-5 mx-auto md:w-[552px]'>
          <div className='mt-0 flex items-center md:gap-10 mb-5 md:mb-0'>
            <ProfilePicture image={profileImage} />
            <div>
              <span className='font-semibold text-2xl md:text-3xl'>
                {currentUser.username}
              </span>
              <input
                accept='image/*'
                id='image'
                type='file'
                className='hidden'
                onChange={handleUpdateProfilePic}
              />
              <label
                htmlFor='image'
                className='text-primary block cursor-pointer text-xs md:text-base'
              >
                Change Profile Photo
              </label>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='h-full flex flex-col gap-4'
          >
            <SectionItem
              text='Full Name'
              placeholder='Harvey Specter'
              value={currentUser.name}
              formOptions={{
                ...register('name', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                }),
              }}
            />
            <SectionItem
              text='Username'
              placeholder='harvey'
              value={currentUser.username}
              formOptions={{
                ...register('username', {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.]*$/,
                  minLength: 5,
                  maxLength: 20,
                }),
              }}
            />
            <SectionItem
              text='Website'
              placeholder='https://kenizaya.com'
              value={currentUser.website}
              formOptions={{
                ...register('website', {
                  validate: (input) =>
                    Boolean(input)
                      ? isURL(input, {
                          protocols: ['http', 'https'],
                          require_protocol: true,
                        })
                      : true,
                }),
              }}
            />
            <div className='flex flex-col md:flex-row md:gap-8 md:items-center justify-between'>
              <span className='font-semibold'>Bio</span>
              <textarea
                {...register('bio', {
                  maxLength: 120,
                })}
                rows={3}
                defaultValue={currentUser.bio}
                placeholder="I'm the best."
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
              text='Email'
              placeholder='harveylstark@gmail.com'
              value={currentUser.email}
              formOptions={{
                ...register('email', {
                  required: true,
                  validate: (input) => isEmail(input),
                }),
              }}
            />
            <SectionItem
              text='Phone'
              placeholder='1234567890'
              formOptions={{
                ...register('phoneNumber', {
                  validate: (input) =>
                    Boolean(input) ? isMobilePhone(input) : true,
                }),
              }}
              value={currentUser.phoneNumber}
            />

            <button
              type='submit'
              className='py-3 px-4 mt-1 md:ml-32 bg-primary text-white rounded w-32'
            >
              Submit
            </button>
          </form>
          {console.log(profileUpdated)}
          {profileUpdated && (
            <div className='toast toast-center'>
              <div className='alert text-white bg-gray-700 w-max mb-5'>
                <div>
                  <span>Profile Updated Successfully</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

const SectionItem = ({
  type = 'text',
  text,
  placeholder,
  value,
  formOptions,
}) => {
  return (
    <div className='flex flex-col md:flex-row w-full md:gap-8 md:items-center justify-between'>
      <span className='text-sm md:text-base font-semibold text-left'>
        {text}
      </span>
      <input
        {...formOptions}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className='pl-2 md:w-96 rounded border-2 border-gray-300 focus:outline-primary focus:bg-white'
      />
    </div>
  )
}

export default EditProfile
