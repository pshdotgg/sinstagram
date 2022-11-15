import React, { Suspense } from 'react'
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
import Layout from '../components/shared/Layout'
import LoadingScreen from '../components/shared/LoadingScreen'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import UserCard from '../components/shared/UserCard'
import { getDefaultPost } from '../data'
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'))

const Feed = ({ loading = false }) => {
  const [isEndOfFeed, setIsEndOfFeed] = React.useState(false)

  if (loading) return <LoadingScreen />

  return (
    <Layout title='Feed'>
      <section className='grid grid-cols-6 max-w-5xl mx-auto gap-5'>
        <div className='col-span-6 md:col-span-4'>
          {Array.from({ length: 5 }, () => getDefaultPost()).map(
            (post, index) => (
              <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                <FeedPost key={post.id} index={index} post={post} />
              </Suspense>
            )
          )}
          {isEndOfFeed && <LoadingSpinner size={28} />}
        </div>
        <div className='hidden md:col-span-2 md:block'>
          <div className='w-full flex flex-col gap-5 sticky top-20'>
            <div className='pl-5 mt-4'>
              <UserCard />
            </div>

            <FeedSideSuggestions />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Feed
