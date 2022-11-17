import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChangedListener, getUserDoc, getUsers } from '../firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null)
  const [users, setUsers] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(false)

  const value = {
    currentUser,
    setCurrentUser,
    currentUserId,
    setCurrentUserId,
    loading,
    users,
  }

  useEffect(() => {
    const getUsersData = async () => {
      const users = await getUsers()
      setUsers(users)
    }

    getUsersData()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setLoading(true)
      if (user) {
        setCurrentUserId(user ? user.uid : null)
        setCurrentUser(await getUserDoc(user.uid))
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
