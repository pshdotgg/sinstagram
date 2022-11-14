import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useUserContext } from '../src/contexts/userContext'

const firebaseConfig = {
  apiKey: 'AIzaSyBvlLhOh5ZnK3_k7SsIxyU-WHsrpOurl9o',
  authDomain: 'sinstagram-pr.firebaseapp.com',
  projectId: 'sinstagram-pr',
  storageBucket: 'sinstagram-pr.appspot.com',
  messagingSenderId: '570314022901',
  appId: '1:570314022901:web:e3dd9b5d73364eb9214abc',
}

const app = initializeApp(firebaseConfig)

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
    const { email, displayName } = userAuth

    const userData = {
      username: email,
      email: email,
      name: displayName,
      lastChecked: 'null',
      bio: '',
      phoneNumber: '',
      website: '',
      profileImage:
        'https://firebasestorage.googleapis.com/v0/b/sinstagram-pr.appspot.com/o/default-user-image.jpg?alt=media&token=b60c36ec-f909-4789-bf23-2390f04b406f',
    }

    try {
      await setDoc(userDocRef, userData)
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
}

export const signUpWithEmailAndPassword = async (formData) => {
  const { name, email, password, username } = formData

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const userDocRef = doc(db, 'users', user.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
      const userData = {
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
}

export const logInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => {
  console.log(auth)
  signOut(auth)
}
