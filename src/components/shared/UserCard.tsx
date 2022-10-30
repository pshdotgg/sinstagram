import React from 'react'
import { Link } from 'react-router-dom'
import { defaultUser } from '../../data'

const UserCard = ({ user = defaultUser }) => {
  const { profile_image, username, name } = user
  return (
    <div className='flex gap-3'>
      <Link to={`/${username}`}>
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src={profile_image} />
          </div>
        </div>
      </Link>

      <div className='flex flex-col '>
        <Link to={`/${username}`}>
          <span className='text-sm font-semibold'>{username}</span>
        </Link>
        <span className='text-gray-500 text-sm'>{name}</span>
      </div>
    </div>
  )
}

export default UserCard
