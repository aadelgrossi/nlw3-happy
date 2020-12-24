import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import api from '@/services/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface User {
  id: string
  email: string
}

interface SignInCredentials {
  email: string
  password: string
  remember: boolean
}

interface AuthContextData {
  isAuthenticated: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

interface SignInReponse {
  user: User
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('auth')
      if (token) {
        try {
          await api.get<User>('/users/me')
          setIsAuthenticated(true)
          setToken(token)
        } catch (err) {
          api.defaults.headers.authorization = null
          signOut()
          push('/signin')
        }
      }
    }
    loadUserFromCookies()
  }, [])

  const signIn = useCallback(async (data: SignInCredentials) => {
    const response = await api.post<SignInReponse>('/sessions', data)
    const { token } = response.data

    setIsAuthenticated(true)
    setToken(token)
  }, [])

  const signOut = useCallback(() => {
    Cookies.remove('auth')
    setIsAuthenticated(false)
  }, [])

  const setToken = useCallback((token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut
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
