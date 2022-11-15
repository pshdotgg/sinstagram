import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'
import { defaultUser } from '../../data'

const UserCard = () => {
  const { currentUser } = useUserContext()
  const { profileImage, username, name } = currentUser
  return (
    <div className='flex gap-3'>
      <Link to={`/${username}`}>
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src={profileImage} />
          </div>
        </div>
      </Link>

      <div className='flex flex-col '>
        <Link to={`/${username}`} className='text-left'>
          <span className='text-sm font-semibold'>{username}</span>
        </Link>
        <span className='text-gray-500 text-sm'>{name}</span>
      </div>
    </div>
  )
}

export default UserCard
