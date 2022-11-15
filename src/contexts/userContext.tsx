import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChangedListener, getUserDoc } from '../firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(false)

  const value = {
    currentUser,
    setCurrentUser,
    currentUserId,
    setCurrentUserId,
    loading,
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setLoading(true)
      setCurrentUserId(user ? user.uid : null)
      if (user) setCurrentUser(await getUserDoc(user.uid))
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
