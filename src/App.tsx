import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  EditProfile,
  Explore,
  Feed,
  Login,
  NotFound,
  Post,
  Profile,
  Signup,
} from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/p/:postId' element={<Post />} />
        <Route path='/accounts/edit' element={<EditProfile />} />
        <Route path='/accounts/login' element={<Login />} />
        <Route path='/accounts/emailsignup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
