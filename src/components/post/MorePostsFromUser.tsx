import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultUser } from '../../data'
import GridPost from '../shared/GridPost'
import LoadingSpinner from '../shared/LoadingSpinner'
import { getMorePostsFromUser, getPostData } from '../../firebase'
import { useUserContext } from '../../contexts/userContext'

const MorePostsFromUser = ({ postId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const userId = (await getPostData(postId)).userId
      const tempPosts = await getMorePostsFromUser(userId, postId)
      setPosts(tempPosts)
    }

    getPosts()
  }, [])

  if (posts.length === 0) return <LoadingSpinner />

  return (
    <div className='mt-8'>
      <h3 className='mb-2'>
        More Posts from{' '}
        <Link to={`/${defaultUser.username}`} className='font-bold'>
          {defaultUser.username}
        </Link>
      </h3>
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

export default MorePostsFromUser
