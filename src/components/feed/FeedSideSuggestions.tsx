import React, { useEffect, useState } from 'react'
import { getDefaultUser } from '../../data'
import FollowButton from '../shared/FollowButton'
import UserCard from '../shared/UserCard'
import LoadingSpinner from '../shared/LoadingSpinner'
import { suggestUsers } from '../../firebase'
import { useUserContext } from '../../contexts/userContext'

const FeedSideSuggestions = () => {
  const { currentUser, currentUserId } = useUserContext()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true)
      const tempUsers = await suggestUsers(5, currentUserId)
      setUsers(tempUsers)
      setLoading(false)
    }

    getSuggestedUsers()
  }, [])

  return (
    <article className='card bg-white rounded'>
      <div className='card-body p-5'>
        <h3>Suggestions For You</h3>
        {loading ? (
          <LoadingSpinner />
        ) : (
          users.map((user) => {
            return (
              <div key={user.id} className='flex justify-between items-center'>
                <UserCard user={user} />
                <FollowButton id={user.uid} side />
              </div>
            )
          })
        )}
      </div>
    </article>
  )
}

export default FeedSideSuggestions
