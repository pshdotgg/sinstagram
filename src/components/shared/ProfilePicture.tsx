import React from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { defaultCurrentUser } from '../../data'

const ProfilePicture = ({
  image = defaultCurrentUser.profile_image,
  isOwner,
}) => {
  return (
    <div className='w-36 md:w-44 md:mt-16'>
      {image ? (
        <img
          src={image}
          className='w-20 h-20 md:w-40 md:h-40 object-cover rounded-full'
          alt='profile'
        />
      ) : (
        <BsPersonFill className='fill-white w-20 h-20 md:w-40 md:h-40' />
      )}
    </div>
  )
}

export default ProfilePicture
