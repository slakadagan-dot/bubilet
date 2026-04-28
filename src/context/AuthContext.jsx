import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

// Helper functions for localStorage operations
const getUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('bubilet_users')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Error reading users from localStorage:', error)
    return []
  }
}

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem('bubilet_users', JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users to localStorage:', error)
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginMessage, setLoginMessage] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const register = async (userData) => {
    setIsLoading(true)
    setLoginMessage(null)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const users = getUsersFromStorage()
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email)
      if (existingUser) {
        setLoginMessage({ type: 'error', text: 'Bu e-posta adresi zaten kayıtlı' })
        return { success: false, error: 'User already exists' }
      }

      // Create new user with ID
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      users.push(newUser)
      saveUsersToStorage(users)

      setLoginMessage({ type: 'success', text: 'Kayıt başarılı! Giriş yapabilirsiniz.' })
      return { success: true, user: newUser }
    } catch (error) {
      setLoginMessage({ type: 'error', text: 'Kayıt sırasında bir hata oluştu' })
      return { success: false, error: 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    setIsLoading(true)
    setLoginMessage(null)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const users = getUsersFromStorage()
      const foundUser = users.find(
        user => user.email === email && user.password === password
      )

      if (foundUser) {
        // Remove password from user object before storing
        const userWithoutPassword = { ...foundUser }
        delete userWithoutPassword.password
        
        setUser(userWithoutPassword)
        setIsAuthenticated(true)
        localStorage.setItem('authUser', JSON.stringify(userWithoutPassword))
        setLoginMessage({ type: 'success', text: 'Giriş başarılı! Yönlendiriliyorsunuz...' })
        return { success: true }
      } else {
        setLoginMessage({ type: 'error', text: 'E-posta veya şifre hatalı' })
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      setLoginMessage({ type: 'error', text: 'Giriş sırasında bir hata oluştu' })
      return { success: false, error: 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setLoginMessage(null)
    localStorage.removeItem('authUser')
  }

  const clearLoginMessage = () => {
    setLoginMessage(null)
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginMessage,
    login,
    register,
    logout,
    clearLoginMessage
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
