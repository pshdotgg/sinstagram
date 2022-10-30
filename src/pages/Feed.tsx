import React from 'react'
import FeedPost from '../components/feed/FeedPost'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
import Layout from '../components/shared/Layout'
import UserCard from '../components/shared/UserCard'
import { getDefaultPost } from '../data'

const Feed = () => {
  return (
    <Layout>
      <section className='grid grid-cols-4 max-w-5xl mx-auto gap-5'>
        <div className='col-span-3'>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
        <div className='hidden md:block'>
          <div>
            <UserCard />
            <FeedSideSuggestions />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Feed
