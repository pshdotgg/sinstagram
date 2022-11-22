import React, { useEffect, useState } from 'react'
import { getDefaultPost } from '../../data'
import GridPost from '../shared/GridPost'
import LoadingSpinner from '../shared/LoadingSpinner'
import { getExplorePosts } from '../../firebase'
import { useUserContext } from '../../contexts/userContext'

const ExploreGrid = () => {
  const { currentUser, currentUserId } = useUserContext()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getExplorePostsData = async () => {
      setLoading(true)
      const tempPosts = await getExplorePosts(
        currentUserId,
        currentUser.following
      )
      setPosts(tempPosts)
      setLoading(false)
    }

    getExplorePostsData()
  }, [])

  return (
    <div>
      <h3 className='text-gray-500  mb-2'>Explore</h3>
      {loading ? (
        <LoadingSpinner size={28} />
      ) : (
        <article className='grid'>
          <div className='grid md:grid-cols-3 gap-5 md:gap-6'>
            {posts.map((post) => {
              return <GridPost key={post.id} post={post} />
            })}
          </div>
        </article>
      )}
    </div>
  )
}

export default ExploreGrid
