import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChangedListener,
  getUserDoc,
  getUsers,
  getNotifications,
} from '../firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null)
  const [users, setUsers] = useState({})
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])

  const value = {
    currentUser,
    setCurrentUser,
    currentUserId,
    setCurrentUserId,
    loading,
    users,
    setUsers,
    notifications,
  }

  useEffect(() => {
    const getUsersData = async () => {
      const users = await getUsers()
      setUsers(users)
    }

    if (currentUser) {
      const getNotificationsData = async () => {
        const tempNotifications = await getNotifications(currentUserId)
        setNotifications(tempNotifications.slice(0, 7))
      }
      getNotificationsData()
    }

    getUsersData()
  }, [currentUser])

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
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
