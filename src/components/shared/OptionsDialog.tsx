import React, { useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { defaultPost } from '../../data'

const OptionsDialog = () => {
  return (
    <>
      <label htmlFor='options-dialog'>
        <MdMoreHoriz size={20} className='cursor-pointer' />
      </label>

      <input type='checkbox' id='options-dialog' className='modal-toggle' />
      <label htmlFor='options-dialog' className='modal'>
        <label
          className='modal-box relative px-0 rounded-xl text-center'
          htmlFor=''
        >
          <button type='button' className='text-red-600 font-semibold'>
            Unfollow
          </button>
          <div className='divider' />
          <Link to={`/p/${defaultPost.id}`}>
            <button type='button'>Go to post</button>
          </Link>
          <div className='divider' />
          <button type='button'>Share</button>
          <div className='divider' />
          <button type='button'>Copy Link</button>
          <div className='divider' />

          <label htmlFor='options-dialog'>
            <span className='cursor-pointer'>Cancel</span>
          </label>
        </label>
      </label>
    </>
  )
}

export default OptionsDialog
