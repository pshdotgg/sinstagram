import React, { useState } from 'react'

const FollowButton = ({ side = false }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const followButton = (
    <button
      type='button'
      className={
        side
          ? 'btn-link btn-sm no-underline text-primary'
          : 'text-white rounded btn-sm py-1  mt-2 bg-primary border-transparent hover:bg-primary hover:border-transparent'
      }
      onClick={() => setIsFollowing(true)}
    >
      Follow
    </button>
  )

  const followingButton = (
    <button
      type='button'
      className={
        side
          ? 'btn btn-outline btn-xs text-gray-900 font-normal px-1 rounded normal-case bg-white hover:bg-base-100 hover:text-gray-900'
          : 'text-white btn-sm rounded py-1  mt-2 bg-primary border-transparent hover:bg-primary hover:border-transparent'
      }
      onClick={() => setIsFollowing(false)}
    >
      Following
    </button>
  )

  return isFollowing ? followingButton : followButton
}

export default FollowButton
