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

  const setToken = useCallback((token: string) => {
    api.defaults.headers.authorization = token
  }, [])

  const signOut = useCallback(() => {
    setToken(null)
    setIsAuthenticated(false)
    Cookies.remove('auth')
  }, [setToken])

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('auth')
      if (token) {
        try {
          setToken(`Bearer ${token}`)
          await api.get<User>('users/me')
          setIsAuthenticated(true)
        } catch (err) {
          signOut()
        }
      }
    }
    loadUserFromCookies()
  }, [setToken, signOut])

  const signIn = useCallback(
    async (data: SignInCredentials) => {
      const response = await api.post<SignInReponse>('/sessions', data)
      const { token } = response.data
      Cookies.set('auth', token)

      setIsAuthenticated(true)
      setToken(`Bearer ${token}`)
    },
    [setToken]
  )

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
