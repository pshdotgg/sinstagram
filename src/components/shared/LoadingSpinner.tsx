import React from 'react'
import { ImSpinner } from 'react-icons/im'

const LoadingSpinner = ({ size = 20 }) => {
  return (
    <div className='flex justify-center items-center pb-4'>
      <ImSpinner className='animate-spin' size={size} />
    </div>
  )
}

export default LoadingSpinner
