import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LoadingSpinner from './LoadingSpinner'
import FollowButton from './FollowButton'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'
import { suggestUsers } from '../../firebase'

const FollowSuggestions = ({ hideHeader }) => {
  const { currentUser, currentUserId } = useUserContext()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getSuggestedUsers = async () => {
      const tempUsers = await suggestUsers(
        10,
        currentUser.following,
        currentUserId
      )
      setUsers(tempUsers)
    }

    getSuggestedUsers()
  }, [])

  let loading = false
  return (
    <div>
      {!hideHeader && (
        <h3 className='text-gray-500 m-2 md:ml-0'>Suggestions For You</h3>
      )}
      {loading ? <LoadingSpinner /> : <FollowSlider users={users} />}
    </div>
  )
}

const FollowSlider = ({ users }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    touchThreshold: 1000,
    variableWidth: true,
    arrows: true,
    swipeToSlide: true,
    slidesToScroll: 3,
    easing: 'ease-in-out',
    dots: false,
  }

  return (
    <Slider
      className='grid pt-2.5 pb-5 px-0 mb-5 mr-0 bg-white rounded border border-[#e6e6e6] border-t-0 '
      {...settings}
    >
      {users.map((user) => (
        <FollowSuggestionsItem key={user.uid} user={user} />
      ))}
    </Slider>
  )
}

const FollowSuggestionsItem = ({ user }) => {
  const { uid, username, name, profileImage } = user

  return (
    <div className='card card-bordered w-44 md:w-52 gap-0 pt-5 bg-white shadow ml-4 items-center rounded'>
      <Link to={`/${username}`}>
        <div className='avatar'>
          <div className='w-16 rounded-full'>
            <img src={profileImage} alt='user profile' />
          </div>
        </div>
      </Link>

      <div className='card-body items-center text-center -mt-5 gap-1'>
        <Link to={`/${username}`}>
          <h3 className='font-semibold'>{username}</h3>
        </Link>

        <span className='text-gray-500 text-sm'>{name}</span>
        <div className='card-actions'>
          <FollowButton id={uid} />
        </div>
      </div>
    </div>
  )
}

export default FollowSuggestions
