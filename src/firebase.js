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
} from 'firebase/firestore'
import { async } from '@firebase/util'

const firebaseConfig = {
  apiKey: 'AIzaSyBvlLhOh5ZnK3_k7SsIxyU-WHsrpOurl9o',
  authDomain: 'sinstagram-pr.firebaseapp.com',
  projectId: 'sinstagram-pr',
  storageBucket: 'sinstagram-pr.appspot.com',
  messagingSenderId: '570314022901',
  appId: '1:570314022901:web:e3dd9b5d73364eb9214abc',
}

const app = firebase.initializeApp(firebaseConfig)

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
      id: uid,
      username: username,
      email: email,
      name: displayName,
      lastChecked: 'null',
      bio: '',
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
        id: user.uid,
        username: username,
        email: email,
        name: name,
        lastChecked: 'null',
        bio: '',
        phoneNumber: '',
        website: '',
        profileImage:
          'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/default-user-image.jpg?alt=media&token=b60c36ec-f909-4789-bf23-2390f04b406f',
      }
      await setDoc(userDocRef, userData)
      setCurrentUser(user)
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email already in use')
    } else console.log('error creating the user', error.message)
  }

  return userDocRef
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

  if (userSnapshot.exists()) return userSnapshot.data()
  else console.log('error')
}

export const setUserDoc = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), data, { merge: true })
}
