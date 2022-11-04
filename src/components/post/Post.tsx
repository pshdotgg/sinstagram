import React, { useState } from 'react'
import {
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import UserCard from '../shared/UserCard'
import OptionsDialog from '../shared/OptionsDialog'
import { defaultPost } from '../../data'
import PostSkeleton from './PostSkeleton'

const Post = () => {
  const { id, media, likes, user, caption, comments } = defaultPost
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  if (loading) return <PostSkeleton />

  return (
    <div className='bg-white w-full '>
      <article className='flex border-2 bg-white rounded'>
        <div className='flex w-[calc(100%-335px)]'>
          <img src={media} alt='media' />
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center p-4 py-10 h-16 mr-0 border border-t-0 border-r-0 border-b-base-300 border-l-base-200'>
            <UserCard user={user} />
            <OptionsDialog />
          </div>

          <div className='flex flex-col flex-grow overflow-x-hidden overflow-hidden border border-t-0 border-l-0 border-r-0 border-b-base-300 '>
            <span className='pt-1 px-6 '>{caption}</span>
            {comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <Link to={`/${comment.user.username}`}>
                    <span>{comment.user.username}</span>
                  </Link>
                  <span>{comment.content}</span>
                </div>
              )
            })}
          </div>

          <div className='p-4 pb-2 '>
            <div className='flex pb-2 gap-5 justify-between items-center '>
              <div className='flex gap-5 items-center'>
                <LikeButton />
                <Link to={`/p/${id}`}>
                  <FaRegComment size={20} />
                </Link>
                <FaShare size={20} />
              </div>
              <SaveButton />
            </div>

            <span className='font-semibold'>
              {likes === 1 ? '1 like' : `${likes} likes`}
            </span>

            <p className='text-xs text-gray-500'>4 DAYS AGO</p>
            <div className='py-0'>
              <div className='divider mt-2 mb-0' />
              <Comment />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

const LikeButton = () => {
  const [liked, setLiked] = useState(false)
  const Icon = liked ? (
    <BsHeartFill size={20} className='fill-red-500 animate-ping-once' />
  ) : (
    <BsHeart size={20} />
  )

  const handleLike = () => {
    setLiked(true)
  }

  const handleUnlike = () => {
    setLiked(false)
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
    <div className='flex gap-5 px-2'>
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

export default Post
