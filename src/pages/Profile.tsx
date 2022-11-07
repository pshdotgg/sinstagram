import React, { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'
import { defaultCurrentUser } from '../data'

const Profile = () => {
  const isOwner = true
  // const [showOptionsMenu, setOptionsMenu] = useState(false)

  // const handleOptionsMenuClick = () => {
  //   setOptionsMenu(true)
  // }

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >
      <section className='hidden md:flex gap-28'>
        <ProfilePicture isOwner={isOwner} />
        <div>
          <ProfileNameSection
            user={defaultCurrentUser}
            isOwner={isOwner}
            // handleOptionsMenuClick={handleOptionsMenuClick}
          />
          <PostCountSection />
          <NameBioSection />
        </div>
      </section>

      <section className='md:hidden'>
        <div>
          <div className='flex gap-5'>
            <ProfilePicture isOwner={isOwner} />
            <ProfileNameSection
              user={defaultCurrentUser}
              isOwner={isOwner}
              // handleOptionsMenuClick={handleOptionsMenuClick}
            />
          </div>
          <NameBioSection />
        </div>
        <PostCountSection />
      </section>
    </Layout>
  )
}

const ProfileNameSection = ({ user, isOwner }) => {
  let followButton
  const isFollower = true
  const isFollowing = true

  if (isFollowing) {
    followButton = (
      <button
        type='button'
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-3 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
      >
        Following
      </button>
    )
  } else if (isFollower) {
    followButton = (
      <button
        type='button'
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-3 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
      >
        Follow Back
      </button>
    )
  } else {
    followButton = (
      <button
        type='button'
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-6 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
      >
        Follow
      </button>
    )
  }

  return (
    <>
      <section className='hidden md:flex items-center justify-between w-full gap-16'>
        <h2 className='text-base-900 text-3xl'>{user.username}</h2>

        {isOwner ? (
          <>
            {' '}
            <Link to='/accounts/edit'>
              <button
                type='button'
                className='btn btn-outline btn-sm text-gray-900 font-semibold px-3 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
              >
                Edit Profile
              </button>
            </Link>
            <OptionsMenu />
          </>
        ) : (
          <>{followButton}</>
        )}
      </section>

      <section className='md:hidden flex flex-col gap-5 w-full'>
        <div className='flex gap-10 items-center '>
          <h2 className='text-base-900 text-3xl '>{user.username}</h2>

          {isOwner ? <OptionsMenu /> : <>{followButton}</>}
        </div>
        <Link to='/accounts/edit'>
          <button
            type='button'
            className='btn btn-outline btn-sm text-gray-900 font-semibold px-3 w-full rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
          >
            Edit Profile
          </button>
        </Link>
      </section>
    </>
  )
}
const PostCountSection = () => {
  return <div>PostCount</div>
}
const NameBioSection = () => {
  return <div>NameBio</div>
}

const OptionsMenu = () => {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutMessage(true)
  }
  return (
    <>
      <label htmlFor='options-dialog'>
        <BsGear size={24} className='cursor-pointer' />
      </label>
      <input type='checkbox' id='options-dialog' className='modal-toggle' />
      <label htmlFor='options-dialog' className='modal'>
        <label
          className='modal-box relative px-0 rounded-xl text-center'
          htmlFor=''
        >
          <>
            <button type='button'>Change Password</button>
            <div className='divider' />
            <button type='button'>Nametag</button>
            <div className='divider' />
            <button type='button'>Apps and Websites</button>
            <div className='divider' />
            <button type='button'>Notifications</button>
            <div className='divider' />
            <button type='button'>Privacy and Security</button>
            <div className='divider' />
            <button type='button' onClick={handleLogoutClick}>
              Log out
            </button>
            <div className='divider' />

            <label htmlFor='options-dialog'>
              <span className='cursor-pointer'>Cancel</span>
            </label>
          </>
        </label>
      </label>
    </>
  )
}

const OptionsItem = (text, onClick = '') => {
  return (
    <>
      <button type='button'>{text}</button>
      <div className='divider' />
    </>
  )
}

export default Profile
