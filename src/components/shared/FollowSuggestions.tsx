import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LoadingSpinner from './LoadingSpinner'
import { getDefaultUser } from '../../data'
import FollowButton from './FollowButton'
import { Link } from 'react-router-dom'

const FollowSuggestions = () => {
  let loading = false
  return (
    <div>
      <h3 className='text-gray-500'>Suggestions For You</h3>
      {loading ? <LoadingSpinner /> : <FollowSlider />}
    </div>
  )
}

const FollowSlider = () => {
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
      className='grid pt-2.5 pb-5 px-0 mb-5 bg-white rounded border border-[#e6e6e6] border-t-0 '
      {...settings}
    >
      {Array.from({ length: 10 }, () => getDefaultUser()).map((user) => (
        <FollowSuggestionsItem key={user.id} user={user} />
      ))}
    </Slider>
  )
}

const FollowSuggestionsItem = ({ user }) => {
  const { username, name, profile_image } = user

  return (
    <div className='card card-bordered w-44 md:w-52 gap-0 pt-5 bg-white shadow ml-4 items-center rounded'>
      <Link to={`/${username}`}>
        <div className='avatar'>
          <div className='w-16 rounded-full'>
            <img src={profile_image} alt='user profile' />
          </div>
        </div>
      </Link>

      <div className='card-body items-center text-center -mt-5 gap-1'>
        <Link to={`/${username}`}>
          <h3 className='font-semibold'>{username}</h3>
        </Link>

        <span className='text-gray-500 text-sm'>{name}</span>
        <div className='card-actions'>
          <FollowButton />
        </div>
      </div>
    </div>
  )
}

export default FollowSuggestions
