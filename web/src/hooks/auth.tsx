import api from '@/services/api'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
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

interface AuthState {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const response = await api.get<User>('/users/me')
        setUser(response.data)
      }
    }
    loadUserFromCookies()
  }, [])

  const signIn = useCallback(
    async ({ email, password, keep_logged_in }: SignInCredentials) => {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password
      })

      const { token } = response.data

      if (keep_logged_in) {
        Cookies.set('token', token, { expires: 7 })
      } else {
        Cookies.set('token', token)
      }

      console.log(response.data)
      api.defaults.headers.authorization = `Bearer ${token}`
      setUser(response.data.user)
    },
    []
  )

  const signOut = useCallback(() => {
    Cookies.remove('token')
    setUser(null)
    delete api.defaults.headers.authorization
    window.location.pathname = '/signin'
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: !!user
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
