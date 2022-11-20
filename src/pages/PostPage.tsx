import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import Post from '../components/post/Post'
import MorePostsFromUser from '../components/post/MorePostsFromUser'
import { getPostData } from '../firebase'
import PostSkeleton from '../components/post/PostSkeleton'

const PostPage = () => {
  const { postId } = useParams()

  return (
    <Layout>
      <Post postId='gqcecmDaUpxtlCu8zzjr' />
      <MorePostsFromUser />
    </Layout>
  )
}

export default PostPage
