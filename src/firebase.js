import firebase from 'firebase/compat/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

const firebaseConfig = {
  apiKey: 'AIzaSyBvlLhOh5ZnK3_k7SsIxyU-WHsrpOurl9o',
  authDomain: 'sinstagram-pr.firebaseapp.com',
  projectId: 'sinstagram-pr',
  storageBucket: 'sinstagram-pr.appspot.com',
  messagingSenderId: '570314022901',
  appId: '1:570314022901:web:e3dd9b5d73364eb9214abc',
}

const app = firebase.initializeApp(firebaseConfig)

export const storage = getStorage()

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocument = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { uid, email, displayName, photoURL } = userAuth
    const username = `${displayName.replace(/\s+/g, '')}${uid.slice(-5)}`
    const userData = {
      uid: uid,
      username: username,
      email: email,
      name: displayName,
      lastChecked: 'null',
      bio: '',
      posts: [],
      likes: [],
      notifications: [],
      savedPosts: [],
      followers: [],
      following: [],
      createdAt: Date.now(),
      phoneNumber: '',
      website: '',
      profileImage:
        photoURL ||
        'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/default-user-image.jpg?alt=media&token=b60c36ec-f909-4789-bf23-2390f04b406f',
    }

    try {
      await setDoc(userDocRef, userData)
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const signUpWithEmailAndPassword = async (formData) => {
  const { name, email, password, username } = formData
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  const userDocRef = doc(db, 'users', user.uid)

  const userSnapshot = await getDoc(userDocRef)

  try {
    if (!userSnapshot.exists()) {
      const userData = {
        uid: user.uid,
        username: username,
        email: email,
        name: name,
        lastChecked: 'null',
        bio: '',
        posts: [],
        likes: [],
        notifications: [],
        savedPosts: [],
        followers: [],
        following: [],
        createdAt: Date.now(),
        phoneNumber: '',
        website: '',
        profileImage:
          'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/default-user-image.jpg?alt=media&token=b60c36ec-f909-4789-bf23-2390f04b406f',
      }
      await setDoc(userDocRef, userData)
      return userData
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email already in use')
    } else console.log('error creating the user', error.message)
  }
}

export const logInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
  await signOut(auth)
}

export const updateUserEmail = async (email) => {
  await updateEmail(auth.currentUser, email)
}

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)

export const getUserDoc = async (userId) => {
  const userDocRef = doc(db, 'users', userId)

  const userSnapshot = await getDoc(userDocRef)

  return userSnapshot.data()
}

export const setUserDoc = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), data, { merge: true })
}

export const getUsers = async () => {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const users = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { username, name, uid, profileImage } = docSnapshot.data()
    acc[username] = { uid, name, profileImage, username }
    return acc
  }, {})

  return users
}

export const getUserPosts = async (userId) => {
  const posts = []

  const userDocRef = doc(db, 'users', userId)

  const userSnapshot = await getDoc(userDocRef)

  for (const postId of userSnapshot.data().posts) {
    const postSnapshot = await getDoc(doc(db, 'posts', postId))
    const tempPost = postSnapshot.data()
    tempPost.user = userSnapshot.data()
    posts.unshift(tempPost)
  }
  return posts
}

export const getSavedPosts = async (userId) => {
  const posts = []
  const userDocRef = doc(db, 'users', userId)

  const userSnapshot = await getDoc(userDocRef)

  for (const postId of userSnapshot.data().savedPosts) {
    const postSnapshot = await getDoc(doc(db, 'posts', postId))
    posts.unshift(postSnapshot.data())
  }

  return posts
}

export const setUserPosts = async (userId, media, caption) => {
  const post = {
    createdAt: Date.now(),
    media: media,
    caption: caption,
    userId: userId,
    likes: [],
    comments: [],
    id: '',
  }

  const postRef = await addDoc(collection(db, 'posts'), post)
  await updateDoc(doc(db, 'users', userId), {
    posts: arrayUnion(postRef.id),
  })

  await updateDoc(doc(db, 'posts', postRef.id), {
    id: postRef.id,
  })
}

export const deleteUserPost = async (userId, postId) => {
  try {
    await deleteDoc(doc(db, 'posts', postId))
    await updateDoc(doc(db, 'users', userId), {
      posts: arrayRemove(postId),
      savedPosts: arrayRemove(postId),
    })
  } catch (error) {
    console.log(error)
  }
}

export const getPostData = async (postId) => {
  const postSnapshot = await getDoc(doc(db, 'posts', postId))
  const post = postSnapshot.data()

  const ownerSnapshot = await getDoc(doc(db, 'users', post.userId))
  post.user = ownerSnapshot.data()

  return post
}

export const getPostLikes = async (postId) => {
  const postSnapshot = await getDoc(doc(db, 'posts', postId))
  return postSnapshot.data().likes
}

export const likePost = async (postId, userId, profileId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      likes: arrayUnion(postId),
    })
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayUnion(userId),
    })

    const notification = {
      id: uuid(),
      createdAt: Date.now(),
      postId: postId,
      type: 'like',
      userId: userId,
    }

    await updateDoc(doc(db, 'users', profileId), {
      notifications: arrayUnion(notification),
    })
  } catch (error) {
    console.log(error)
  }
}

export const unlikePost = async (postId, userId, profileId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      likes: arrayRemove(postId),
    })
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayRemove(userId),
    })

    const userSnapshot = await getDoc(doc(db, 'users', profileId))
    const notifications = userSnapshot
      .data()
      .notifications.filter((notification) => notification.postId !== postId)

    await updateDoc(doc(db, 'users', profileId), {
      notifications: notifications,
    })
  } catch (error) {
    console.log(error)
  }
}

export const savePost = async (postId, userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      savedPosts: arrayUnion(postId),
    })
  } catch (error) {
    console.log(error)
  }
}

export const unsavePost = async (postId, userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      savedPosts: arrayRemove(postId),
    })
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async (postId, comment) => {
  try {
    await updateDoc(doc(db, 'posts', postId), {
      comments: arrayUnion(comment),
    })
  } catch (error) {
    console.log(error)
  }
}

export const getNotifications = async (userId) => {
  const currentUserSnapshot = await getDoc(doc(db, 'users', userId))
  const notifications = currentUserSnapshot.data().notifications

  for (const notification of notifications) {
    if (notification.type === 'like') {
      const postSnapshot = await getDoc(doc(db, 'posts', notification.postId))
      notification.post = {
        postId: notification.postId,
        media: postSnapshot.data().media,
      }
    }

    const userSnapshot = await getDoc(doc(db, 'users', notification.userId))
    notification.user = {
      uid: userSnapshot.data().uid,
      username: userSnapshot.data().username,
      profileImage: userSnapshot.data().profileImage,
    }
  }

  return notifications.filter((notification) => notification.userId !== userId)
}

export const checkNotifications = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), { lastChecked: Date.now() })
  } catch (error) {
    console.log(error)
  }
}

export const followUser = async (userId, currentUserId) => {
  try {
    await updateDoc(doc(db, 'users', currentUserId), {
      following: arrayUnion(userId),
    })

    await updateDoc(doc(db, 'users', userId), {
      followers: arrayUnion(currentUserId),
      notifications: arrayUnion({
        id: uuid(),
        createdAt: Date.now(),
        postId: null,
        type: 'follow',
        userId: currentUserId,
      }),
    })
  } catch (error) {
    console.log(error)
  }
}

export const unfollowUser = async (userId, currentUserId) => {
  try {
    await updateDoc(doc(db, 'users', currentUserId), {
      following: arrayRemove(userId),
    })

    const userSnapshot = await getDoc(doc(db, 'users', userId))
    const notifications = userSnapshot
      .data()
      .notifications.filter(
        (notification) => notification.userId !== currentUserId
      )

    await updateDoc(doc(db, 'users', userId), {
      followers: arrayRemove(currentUserId),
      notifications: notifications,
    })
  } catch (error) {
    console.log(error)
  }
}

export const suggestUsers = async (limit, currentUserId) => {
  const users = []

  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, where('uid', '!=', currentUserId))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => users.push(doc.data()))

  return users.slice(0, limit)
}

export const getExplorePosts = async (currentUserId, following) => {
  const collectionRef = collection(db, 'posts')
  const posts = []
  let q
  let querySnapshot

  if (following?.length > 0) {
    q = query(collectionRef, where('userId', 'not-in', following))
    querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.data().userId !== currentUserId) posts.push(doc.data())
    })
  }

  if (posts.length === 0) {
    q = query(collectionRef)
    querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.data().userId !== currentUserId) posts.push(doc.data())
    })
  }

  posts.sort((a, b) => b.createdAt - a.createdAt)

  return posts
}

export const getMorePostsFromUser = async (userId, postId) => {
  const userPosts = await getUserPosts(userId)
  const posts = userPosts.filter((post) => post.id !== postId)

  return posts
}

export const getFeed = async (currentUserId, following) => {
  const feedIds = [...following, currentUserId]
  const feedPosts = []
  const collectionRef = collection(db, 'posts')
  let q
  let querySnapshot

  if (following?.length > 0) {
    q = query(collectionRef, where('userId', 'in', feedIds))
    querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => feedPosts.push(doc.data()))
  }

  if (feedPosts.length === 0) {
    q = query(collectionRef)
    querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => feedPosts.push(doc.data()))
  }
  feedPosts.sort((a, b) => b.createdAt - a.createdAt)

  return feedPosts
}
