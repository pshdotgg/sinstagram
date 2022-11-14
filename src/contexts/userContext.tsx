import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
