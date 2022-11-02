import React from 'react'
import { getDefaultPost } from '../../data'
import GridPost from '../shared/GridPost'
import LoadingSpinner from '../shared/LoadingSpinner'

const ExploreGrid = () => {
  let loading = false
  return (
    <div>
      <h3 className='text-gray-500  mb-2'>Explore</h3>
      {loading ? (
        <LoadingSpinner size={28} />
      ) : (
        <article className='grid'>
          <div className='grid md:grid-cols-3 gap-5 md:gap-6'>
            {Array.from({ length: 20 }, () => getDefaultPost()).map((post) => {
              return <GridPost key={post.id} post={post} />
            })}
          </div>
        </article>
      )}
    </div>
  )
}

export default ExploreGrid
