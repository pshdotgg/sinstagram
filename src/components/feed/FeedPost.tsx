import React, { useEffect, useState } from 'react'
import {
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import UserCard from '../shared/UserCard'
import FollowSuggestions from '../shared/FollowSuggestions'
import OptionsDialog from '../shared/OptionsDialog'
import {
  getPostData,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  addComment,
  getUserDoc,
} from '../../firebase'
import { useUserContext } from '../../contexts/userContext'
import { formatDateToNow } from '../../utils/formatDate'

const FeedPost = ({ post, index }) => {
  const { id, media, likes, userId, caption, comments, createdAt } = post
  const [user, setUser] = useState({})
  const [totalLikes, setTotalLikes] = useState(likes.length)
  const [showCaption, setShowCaption] = useState(false)
  const showFollowSuggestions = index === 1

  useEffect(() => {
    const getUser = async () => {
      setUser(await getUserDoc(userId))
    }

    getUser()
  }, [])

  return (
    <>
      <article className='border-2 bg-white mb-5 rounded'>
        <div className='flex justify-between items-center px-4 py-2'>
          <UserCard user={user} />
          <OptionsDialog
            postId={id}
            authorId={userId}
            username={user.username}
          />
        </div>

        <div>
          <img
            src={media}
            alt='media'
            className='w-full object-cover aspect-square'
          />
        </div>

        <div className='p-4 pb-2'>
          <div className='flex pb-2 gap-5 justify-between items-center'>
            <div className='flex gap-5 items-center'>
              <LikeButton
                postId={id}
                profileId={user?.uid}
                setTotalLikes={setTotalLikes}
              />
              <Link to={`/p/${id}`}>
                <FaRegComment size={20} />
              </Link>
              <FaShare size={20} />
            </div>
            <SaveButton />
          </div>

          <span className='font-semibold'>
            {totalLikes === 1 ? '1 like' : `${totalLikes} likes`}
          </span>
          <div className='flex flex-col mb-0'>
            <Link to={`/${user.username}`} className='font-bold inline-block'>
              {`${user.username} `}
            </Link>
            {showCaption ? (
              <p dangerouslySetInnerHTML={{ __html: caption }}></p>
            ) : (
              <div className='inline-block'>
                {caption.length >= 45 ? (
                  `${caption.slice(0, 45)}...   `
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: caption }}
                    className='-mb-5'
                  ></p>
                )}
                <button
                  type='button'
                  className='pl-2 text-gray-500'
                  onClick={() => setShowCaption(true)}
                >
                  {caption.length >= 45 && ' more'}
                </button>
              </div>
            )}
          </div>
          <Link to={`/p/${id}`} className='text-gray-500 text-sm'>
            View all {comments.length} comments
          </Link>
          {comments?.map((comment) => {
            return (
              <div key={comment.id}>
                <Link to={`/${comment.user.username}`}>
                  <span>{comment.user.username}</span>
                </Link>
                <span>{comment.content}</span>
              </div>
            )
          })}
          <p className='text-xs text-gray-500'>{formatDateToNow(createdAt)}</p>
        </div>
        <div className='py-0'>
          <div className='divider mt-2 mb-0' />
          <Comment />
        </div>
      </article>
      {showFollowSuggestions && <FollowSuggestions />}
    </>
  )
}

const LikeButton = ({ postId, profileId, setTotalLikes }) => {
  const { currentUserId, currentUser } = useUserContext()
  const isAlredyLiked = currentUser.likes.includes(postId)
  const [liked, setLiked] = useState(isAlredyLiked)

  const Icon = liked ? (
    <BsHeartFill size={20} className='fill-red-500 animate-ping-once' />
  ) : (
    <BsHeart size={20} />
  )

  const handleLike = async () => {
    setLiked(true)
    setTotalLikes((prev) => prev + 1)
    await likePost(postId, currentUserId, profileId)
  }

  const handleUnlike = async () => {
    setLiked(false)
    setTotalLikes((prev) => prev - 1)
    await unlikePost(postId, currentUserId, profileId)
  }

  return (
    <div
      className='flex items-center justify-center '
      onClick={liked ? handleUnlike : handleLike}
    >
      {Icon}
    </div>
  )
}

const SaveButton = () => {
  const [saved, setSaved] = useState(false)
  const Icon = saved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />

  const handleSave = () => {
    setSaved(true)
  }

  const handleRemove = () => {
    setSaved(false)
  }

  return (
    <div
      className='flex items-center justify-center '
      onClick={saved ? handleRemove : handleSave}
    >
      {Icon}
    </div>
  )
}

const Comment = () => {
  const [content, setContent] = useState('')

  return (
    <div className='flex gap-5 px-4'>
      <textarea
        className='textarea textarea-ghost w-full focus:outline-none border-none resize-none p-0 m-0 overflow-hidden'
        value={content}
        rows={1}
        placeholder='Add a comment...'
        onChange={(event) => setContent(event.target.value)}
      />
      <button
        disabled={!content.trim()}
        type='button'
        className='text-primary disabled:opacity-60 self-start'
      >
        Post
      </button>
    </div>
  )
}

export default FeedPost
