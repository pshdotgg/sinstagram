import React from 'react'
import FeedPost from '../components/feed/FeedPost'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
import Layout from '../components/shared/Layout'
import UserCard from '../components/shared/UserCard'
import { getDefaultPost } from '../data'

const Feed = () => {
  return (
    <Layout>
      <section className='grid grid-cols-6 max-w-5xl mx-auto gap-5'>
        <div className='col-span-6 md:col-span-4'>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
        <div className='hidden md:col-span-2 md:block'>
          <div className='w-full'>
            <UserCard />
            <FeedSideSuggestions />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Feed
