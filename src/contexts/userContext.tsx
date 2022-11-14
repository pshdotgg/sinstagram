import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChangedListener, createUserDocument } from '../firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
