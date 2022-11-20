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
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

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
      savedPosts: [],
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
        savedPosts: [],
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

export const signOutUser = () => {
  signOut(auth)
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

  userSnapshot.data().postsId.forEach(async (post) => {
    const postSnapshot = await getDoc(post)
    posts.push(postSnapshot.data())
  })

  return posts
}

export const setUserPosts = async (userId, media, caption) => {
  const post = {
    createdAt: Date.now(),
    media: media,
    caption: caption,
    userId: doc(db, 'users', userId),
    likes: [],
    comments: [],
  }

  const postRef = await addDoc(collection(db, 'posts'), post)
  await updateDoc(doc(db, 'users', userId), {
    postsId: arrayUnion(doc(db, 'posts', postRef.id)),
  })
}

export const getPostData = async (postId) => {
  const postSnapshot = await getDoc(doc(db, 'posts', postId))
  const post = postSnapshot.data()

  const ownerSnapshot = await getDoc(post.userId)
  post.user = ownerSnapshot.data()
  post.likes = await getPostLikes(post.likes)
  post.comments = await getPostComments(post.comments)

  console.log('likess', post.likes)

  return post
}

export const getPostLikes = async (likesArr) => {
  const likes = []
  likesArr.forEach(async (like) => {
    const likeSnapshot = await getDoc(like)
    likes.push(likeSnapshot.data())
  })

  return likes
}

export const getPostComments = async (commentsArr) => {
  const comments = []
  commentsArr.forEach(async (comment) => {
    const commentAuthorSnapshot = await getDoc(comment.user)
    comment.user = await commentAuthorSnapshot.data()
    comments.push({ ...comment, user: comment.user })
  })

  return comments
}

export const likePost = async (postId, userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      likes: arrayUnion(doc(db, 'posts', postId)),
    })
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayUnion(doc(db, 'users', userId)),
    })
  } catch (error) {
    console.log(error)
  }
}

export const unlikePost = async (postId, userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      likes: arrayRemove(doc(db, 'posts', postId)),
    })
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayRemove(doc(db, 'users', userId)),
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
