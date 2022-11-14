import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

const signUpWithEmailAndPassword = async (formData) => {
  const data = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  )
}

export const db = getFirestore()

export const createUserDocument = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.email)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { uid, email, displayName } = userAuth
    console.log(userAuth)

    const userData = {
      id: uid,
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
