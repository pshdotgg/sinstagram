import React from 'react'
import { Link } from 'react-router-dom'
import { getDefaultPost, defaultUser } from '../../data'
import GridPost from '../shared/GridPost'
import LoadingSpinner from '../shared/LoadingSpinner'

const MorePostsFromUser = () => {
  let loading = false
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
            {Array.from({ length: 6 }, () => getDefaultPost()).map((post) => {
              return <GridPost key={post.id} post={post} />
            })}
          </div>
        </article>
      )}
    </div>
  )
}

export default MorePostsFromUser
