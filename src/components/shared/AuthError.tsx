import React from 'react'

const AuthError = ({ error }) => {
  return Boolean(error) ? (
    <span className='text-red-500 text-center'>{error}</span>
  ) : null
}

export default AuthError
