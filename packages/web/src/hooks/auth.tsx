import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import api from '@/services/api'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
}

interface SignInCredentials {
  email: string
  password: string
  keep_logged_in: boolean
}

interface AuthContextData {
  user: User
  isAuthenticated: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('auth')
      if (token) {
        // const response = await api.get<User>('/users/me')
        // setUser(response.data)
        setIsAuthenticated(true)
      }
    }
    loadUserFromCookies()
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    await api.post('/sessions', {
      email,
      password
    })
  }, [])

  const signOut = useCallback(() => {
    Cookies.remove('auth')
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
