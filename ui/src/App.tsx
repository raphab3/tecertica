
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Login from './shared/Providers/Auth/Login.provider'
import { getFromStorage } from './shared/Providers/Storage.provider'
import { useAuth } from './hooks/Auth'
import { useEffect } from 'react'

export const App = () => {
  const { state, setState } = useAuth()
  const token = getFromStorage('token')

  if (!state.token && !token) {
    return <Login />
  }

  useEffect(() => {
    checkTokenStorage()
  }, [])

  const checkTokenStorage = () => {
    if (token) {
      setState({
        ...state,
        token
      })
    }
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="*" element={<Navigate to={'/dashboard'} />} />
          </Routes>
        </Router>
      </ChakraProvider >
    </>
  )
}
