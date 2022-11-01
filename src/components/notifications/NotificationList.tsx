import React, { useRef } from 'react'
import { defaultNotifications } from '../../data'
import { RiArrowUpSFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import FollowButton from '../shared/FollowButton'

const NotificationList = ({ className = '' }) => {
  return (
    <div
      className={`absolute flex flex-col gap-0 justify-center items-end m-0 z-10 ${className}`}
    >
      <RiArrowUpSFill size={50} className='fill-white p-0' />
      <div className='card w-full bg-base-100 shadow-xl rounded -mt-5'>
        <div className='card-body p-0 m-0'>
          {defaultNotifications.map((notification) => {
            const { username, profile_image, name } = notification.user
            const isLike = notification.type === 'like'
            const isFollow = notification.type === 'follow'

            return (
              <div
                key={notification.id}
                className='flex hover:bg-base-300 flex-col'
              >
                <div className='flex items-center'>
                  <Link to={`/${notification.user.username}`}>
                    <div className='cursor-pointer w-80  p-4 pb-0 -mt-2 '>
                      <div className='flex gap-3'>
                        <div className='avatar'>
                          <div className='w-12 rounded-full'>
                            <img src={profile_image} />
                          </div>
                        </div>

                        <div className='flex flex-col '>
                          <span className='text-sm font-semibold'>
                            {username}
                          </span>
                          <span className='text-gray-500 text-sm'>
                            {isLike && 'liked your photo. 4d'}
                            {isFollow && 'started following you. 5d'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='w-24'>
                    {isLike && (
                      <Link to={`/p/${notification.post.id}`}>
                        <div className='avatar py-2'>
                          <div className='rounded w-16'>
                            <img src={notification.post.media} alt='post' />
                          </div>
                        </div>
                      </Link>
                    )}

                    {isFollow && <FollowButton />}
                  </div>
                </div>
                <div className='divider -my-1 -mb-4'></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NotificationList
