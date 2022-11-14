import React, { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'
import ProfileTabs from '../components/profile/ProfileTabs'
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
        <div className='flex flex-col gap-8'>
          <ProfileNameSection
            user={defaultCurrentUser}
            isOwner={isOwner}
            // handleOptionsMenuClick={handleOptionsMenuClick}
          />
          <PostCountSection user={defaultCurrentUser} />
          <NameBioSection user={defaultCurrentUser} />
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
          <NameBioSection user={defaultCurrentUser} />
        </div>
        <PostCountSection user={defaultCurrentUser} />
      </section>
      {<ProfileTabs user={defaultCurrentUser} isOwner={isOwner} />}
    </Layout>
  )
}

const ProfileNameSection = ({ user, isOwner }) => {
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(true)

  let followButton
  const isFollowing = false
  const isFollower = false

  if (isFollowing) {
    followButton = (
      <>
        <label
          htmlFor='unfollow-dialog'
          className='btn btn-outline btn-sm text-gray-900 font-semibold px-3
          rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300
          hover:bg-base-200 hover:text-gray-900'
        >
          Following
        </label>
      </>
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
      <section className='hidden md:flex items-center justify-between w-80   gap-16'>
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
      {showUnfollowDialog && <UnfollowDialog user={user} />}
    </>
  )
}

const UnfollowDialog = ({ user }) => {
  return (
    <>
      <input type='checkbox' id='unfollow-dialog' className='modal-toggle' />
      <label htmlFor='unfollow-dialog' className='modal'>
        <label
          className='modal-box relative px-0 rounded-xl text-center w-96'
          htmlFor=''
        >
          <div className='avatar'>
            <div className='w-32 rounded-full'>
              <img src={user.profile_image} alt='user avatar' />
            </div>
          </div>

          <span className='block mt-4'>
            Unfollow <span className='font-semibold'>@{user.username}</span>?
          </span>
          <div className='divider my-2' />
          <button className='text-red-600 font-semibold' type='button'>
            Unfollow
          </button>
          <div className='divider  my-2' />
          <label htmlFor='unfollow-dialog'>
            <span className='cursor-pointer'>Cancel</span>
          </label>
        </label>
      </label>
    </>
  )
}
const PostCountSection = ({ user }) => {
  const options = ['posts', 'followers', 'following']
  return (
    <>
      <div className='md:hidden divider my-1' />
      <section className='flex gap-5 justify-between sm:w-96'>
        {options.map((option) => {
          return (
            <div key={option} className='flex flex-col items-center'>
              <span className='font-semibold'>{user[option].length} </span>
              <span className='hidden md:inline-block'>{option}</span>
              <span className='md:hidden text-gray-500'>{option}</span>
            </div>
          )
        })}
      </section>
      <div className='md:hidden divider my-1' />
    </>
  )
}
const NameBioSection = ({ user }) => {
  return (
    <section className='flex flex-col gap-1'>
      <h3 className='font-semibold'>{user.name}</h3>
      <span>{user.bio}</span>
      <a
        href={user.website}
        className='block text-[#00376b] font-semibold w-max'
        target='_blank'
        rel='noopener noreferrer'
      >
        {user.website}
      </a>
    </section>
  )
}

const OptionsMenu = () => {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutMessage(true)
  }
  return (
    <>
      <label htmlFor='options-menu'>
        <BsGear size={24} className='cursor-pointer' />
      </label>
      <input type='checkbox' id='options-menu' className='modal-toggle' />
      <label htmlFor='options-menu' className='modal'>
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

            <label htmlFor='options-menu'>
              <span className='cursor-pointer'>Cancel</span>
            </label>
          </>
        </label>
      </label>
    </>
  )
}

export default Profile
