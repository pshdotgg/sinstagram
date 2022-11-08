import { v4 as uuid } from 'uuid'

export const defaultUser = {
  id: uuid(),
  username: 'harvey',
  name: 'Harvey Specter',
  profile_image:
    'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/avatar.webp?alt=media&token=ce9d20a8-401e-47c8-a835-66c847c6c959',
}

export function getDefaultUser() {
  return {
    id: uuid(),
    username: 'harvey',
    name: 'Harvey Specter',
    profile_image:
      'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/avatar.webp?alt=media&token=ce9d20a8-401e-47c8-a835-66c847c6c959',
  }
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: 'What do you think? 🔥🤔 Comment below👇',
  user: defaultUser,
  media:
    'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/post.jpg?alt=media&token=fdcbdf7e-a28d-4ce6-a65b-ffd1e33b4d80',
  comments: [],
  created_at: '2022-10-28T03:08:14.522421+00:00',
}

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: 'What do you think? 🔥🤔 Comment below👇',
    user: defaultUser,
    media:
      'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/post.jpg?alt=media&token=fdcbdf7e-a28d-4ce6-a65b-ffd1e33b4d80',
    comments: [],
    created_at: '2022-10-28T03:08:14.522421+00:00',
  }
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: 'follow',
    user: defaultUser,
    created_at: '2022-10-27T03:08:14.522421+00:00',
  },
  {
    id: uuid(),
    type: 'like',
    user: defaultUser,
    post: defaultPost,
    created_at: '2022-10-28T03:08:14.522421+00:00',
  },
]

export const defaultCurrentUser = {
  id: uuid(),
  username: 'stark',
  name: 'Tony Stark',
  profile_image:
    'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/avatar.webp?alt=media&token=ce9d20a8-401e-47c8-a835-66c847c6c959',
  website: 'https://tonystark.com',
  email: 'stark@gmail.com',
  bio: `Loyalty is a two-way street. If I'm asking for it from you, then you're getting it from me.`,
  phone_number: '555-555-5555',
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser],
}
