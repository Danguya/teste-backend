import { ReactNode, createContext, useCallback, useState } from 'react'
import { API } from '../services/axios'

export interface AuthState {
  token: string
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface AuthContextData {
  token: string
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: AuthState): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@App:token')

    if (token) {
      API.defaults.headers.authorization = `Bearer ${token}`

      return { token }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await API.post('/users/sessions', {
      email,
      password,
    })

    const { token } = response.data

    localStorage.setItem('@App:token', token)

    API.defaults.headers.authorization = `Bearer ${token}`

    setData({ token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@App:token')
    localStorage.removeItem('@App:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (token: AuthState) => {
      setData({
        token: data.token,
      })

      localStorage.setItem('@App:token', JSON.stringify(token))
    },

    [data.token],
  )

  return (
    <AuthContext.Provider
      value={{ token: data.token, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
