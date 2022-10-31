import React from 'react'
import { getDefaultUser } from '../../data'
import FollowButton from '../shared/FollowButton'
import UserCard from '../shared/UserCard'
import LoadingSpinner from '../shared/LoadingSpinner'

const FeedSideSuggestions = () => {
  let loading = false
  return (
    <article className='card bg-white rounded'>
      <div className='card-body'>
        <h3>Suggestions For You</h3>
        {loading ? (
          <LoadingSpinner />
        ) : (
          Array.from({ length: 5 }, () => getDefaultUser()).map((user) => {
            return (
              <div key={user.id} className='flex justify-between items-center'>
                <UserCard user={user} />
                <FollowButton side />
              </div>
            )
          })
        )}
      </div>
    </article>
  )
}

export default FeedSideSuggestions
