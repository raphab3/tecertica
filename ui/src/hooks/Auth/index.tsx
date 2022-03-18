import React, { createContext, useContext, useEffect, useState } from 'react'
import { getFromStorage } from 'src/shared/Providers/Storage.provider'

type AuthType = {
  token: string
}

type PropsAuthContext = {
  state: AuthType,
  setState: React.Dispatch<React.SetStateAction<AuthType>>
}

const DEFAULT_VALUE = {
  state: {
    token: ''
  },
  setState: () => { }
}

const AuthContext = createContext<PropsAuthContext>(DEFAULT_VALUE)

export default function AuthContextProvider({ children }: any) {
  const [state, setState] = useState(DEFAULT_VALUE.state)

  return (
    <AuthContext.Provider
      value={{
        state,
        setState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Not Auth provider')
  }
  const {
    state,
    setState
  } = context
  return {
    state,
    setState
  }
}
