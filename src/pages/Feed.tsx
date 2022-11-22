import React, { Suspense, useEffect, useState } from 'react'
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
import Layout from '../components/shared/Layout'
import LoadingScreen from '../components/shared/LoadingScreen'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import UserCard from '../components/shared/UserCard'
import { useUserContext } from '../contexts/userContext'
import { getDefaultPost } from '../data'
import { getFeed } from '../firebase'
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'))

const Feed = () => {
  const [isEndOfFeed, setIsEndOfFeed] = React.useState(false)
  const { currentUser, currentUserId, loading } = useUserContext()
  const [feedPosts, setFeedPosts] = useState([])
  // const [loading, setLoading] = useState(false)

  if (loading) return <LoadingScreen />

  useEffect(() => {
    const getFeedPosts = async () => {
      // setLoading(true)
      const tempPosts = await getFeed(currentUserId, currentUser?.following)
      console.log(tempPosts)
      setFeedPosts(tempPosts)
      // setLoading(false)
    }

    getFeedPosts()
  }, [])

  return (
    <Layout title='Feed'>
      <section className='grid grid-cols-6 max-w-5xl mx-auto gap-5'>
        <div className='col-span-6 md:col-span-4'>
          {feedPosts.map((post, index) => (
            <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost key={post.id} index={index} post={post} />
            </Suspense>
          ))}
          {isEndOfFeed && <LoadingSpinner size={28} />}
        </div>
        <div className='hidden md:col-span-2 md:block'>
          <div className='w-full flex flex-col gap-5 sticky top-20'>
            <div className='pl-5 mt-4'>
              <UserCard user={currentUser} />
            </div>

            <FeedSideSuggestions />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Feed
