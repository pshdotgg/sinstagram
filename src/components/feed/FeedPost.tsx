import React, { useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import {
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaBookmark,
  FaCommentSlash,
} from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import UserCard from '../shared/UserCard'

const FeedPost = ({ post }) => {
  const { id, media, likes, user, caption, comments } = post
  const [showCaption, setShowCaption] = useState(false)

  return (
    <article className='border-2 bg-white mb-5 rounded'>
      <div className='flex justify-between items-center px-4 py-2'>
        <UserCard user={user} />
        <MdMoreHoriz size={20} className='cursor-pointer' />
      </div>

      <div>
        <img src={media} alt='media' />
      </div>

      <div className='p-4 pb-2'>
        <div className='flex pb-2 gap-5 justify-between items-center'>
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
        <div>
          <Link to={`/${user.username}`} className='font-bold '>
            {`${user.username} `}
          </Link>
          {showCaption ? (
            <span>{caption}</span>
          ) : (
            <div className='inline-block'>
              <span>{`${caption.slice(0, 45)}...   `}</span>
              <button
                type='button'
                className='pl-2 text-gray-500'
                onClick={() => setShowCaption(true)}
              >
                {' '}
                more
              </button>
            </div>
          )}
        </div>
        <Link to={`/p/${id}`} className='text-gray-500 text-sm'>
          View all {comments.length} comments
        </Link>
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
        <p className='text-xs text-gray-500'>4 DAYS AGO</p>
      </div>
      <div className='p-4 pt-0'>
        <div className='divider' />
        <Comment />
      </div>
    </article>
  )
}

const LikeButton = () => {
  return (
    <div className='flex items-center justify-center'>
      <BsHeart size={20} />
    </div>
  )
}

const SaveButton = () => {
  return (
    <div className='flex items-center justify-center'>
      <FaRegBookmark size={20} />
    </div>
  )
}

const Comment = () => {
  return <p>Comment</p>
}

export default FeedPost
