import React, { useEffect, useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'
import ProfileTabs from '../components/profile/ProfileTabs'
import { signOutUser } from '../firebase'
import { useUserContext } from '../contexts/userContext'
import LoadingScreen from '../components/shared/LoadingScreen'
import {
  getUserDoc,
  getUserPosts,
  getSavedPosts,
  followUser,
  unfollowUser,
} from '../firebase'

const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({})
  const { currentUser, currentUserId, users } = useUserContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true)
      try {
        const userId = await users[username]?.uid
        const tempUserProfile = await getUserDoc(userId)
        tempUserProfile.posts = await getUserPosts(userId)
        tempUserProfile.savedPosts = await getSavedPosts(userId)
        setUser(tempUserProfile)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    getUserProfile()
  }, [username])

  if (loading) return <LoadingScreen />

  const isOwner = user?.uid === currentUserId

  return (
    <Layout title={`${user.name} (@${user.username})` || 'Sinstagram'}>
      <section className='hidden md:flex gap-28'>
        <ProfilePicture image={user.profileImage} isOwner={isOwner} />
        <div className='flex flex-col gap-8'>
          <ProfileNameSection user={user} isOwner={isOwner} setUser={setUser} />
          <PostCountSection user={user} setUser={setUser} />
          <NameBioSection user={user} />
        </div>
      </section>

      <section className='md:hidden'>
        <div>
          <div className='flex gap-5'>
            <ProfilePicture image={user.profileImage} isOwner={isOwner} />
            <ProfileNameSection
              user={user}
              isOwner={isOwner}
              setUser={setUser}
              // handleOptionsMenuClick={handleOptionsMenuClick}
            />
          </div>
          <NameBioSection user={user} />
        </div>
        <PostCountSection user={user} />
      </section>
      {<ProfileTabs user={user} isOwner={isOwner} />}
    </Layout>
  )
}

const ProfileNameSection = ({ user, isOwner, setUser }) => {
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(true)
  const { currentUser, currentUserId } = useUserContext()
  const isAlreadyFollowing = currentUser.following?.includes(user.uid)
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing)
  const isFollower = !isFollowing && currentUser?.followers?.includes(user.uid)
  let followButton

  const handleFollowUser = async () => {
    setIsFollowing(true)
    setShowUnfollowDialog(true)
    setUser((prev) => {
      return { ...prev, followers: [...prev.followers, currentUserId] }
    })
    await followUser(user.uid, currentUserId)
  }

  useEffect(() => {
    setIsFollowing(isAlreadyFollowing)
  }, [isAlreadyFollowing])

  if (isFollowing) {
    followButton = (
      <label
        htmlFor='unfollow-dialog'
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-3
          rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300
          hover:bg-base-200 hover:text-gray-900'
      >
        Following
      </label>
    )
  } else if (isFollower) {
    followButton = (
      <button
        type='button'
        onClick={handleFollowUser}
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-3 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
      >
        Follow Back
      </button>
    )
  } else {
    followButton = (
      <button
        type='button'
        onClick={handleFollowUser}
        className='btn btn-outline btn-sm text-gray-900 font-semibold px-6 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
      >
        Follow
      </button>
    )
  }

  return (
    <>
      <section className='hidden md:flex items-center justify-between max-w-[382px] gap-10'>
        <h2 className='text-base-900 text-3xl'>{user.username}</h2>

        {isOwner ? (
          <>
            {' '}
            <Link to='/accounts/edit'>
              <button
                type='button'
                className='btn btn-outline btn-sm text-gray-900 flex-1 font-semibold px-3 rounded normal-case bg-base-200 border-gray-300 hover:border-gray-300 hover:bg-base-200 hover:text-gray-900'
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
      {showUnfollowDialog && (
        <UnfollowDialog
          user={user}
          setIsFollowing={setIsFollowing}
          setShowUnfollowDialog={setShowUnfollowDialog}
          setUser={setUser}
        />
      )}
    </>
  )
}

const UnfollowDialog = ({
  user,
  setIsFollowing,
  setShowUnfollowDialog,
  setUser,
}) => {
  const { currentUser, currentUserId } = useUserContext()

  const handleUnfollowUser = async () => {
    setIsFollowing(false)
    setShowUnfollowDialog(false)
    setUser((prev) => {
      return {
        ...prev,
        followers: prev.followers.filter((id) => id !== currentUserId),
      }
    })
    await unfollowUser(user.uid, currentUserId)
  }

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
              <img src={user.profileImage} alt='user avatar' />
            </div>
          </div>

          <span className='block mt-4'>
            Unfollow <span className='font-semibold'>@{user.username}</span>?
          </span>
          <div className='divider my-2' />
          <button
            onClick={handleUnfollowUser}
            className='text-red-600 font-semibold'
            type='button'
          >
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
              <span className='font-semibold'>{user[option]?.length} </span>
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
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    setShowLogoutMessage(true)
    await signOutUser()
    window.location.reload()
    navigate('/accounts/login')
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
