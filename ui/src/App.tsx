
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Login from './shared/Providers/Auth/Login.provider'
import { getFromStorage } from './shared/Providers/Storage/Storage.provider'
import { useAuth } from './hooks/Auth'
import { useEffect } from 'react'
import { SideMenu } from './components/SideMenu'

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

  const theme = extendTheme({
    colors: {
      brand: {
        black: '#000000',
        white: '#ffffff'
      }
    }
  })

  return (
    <>
      <ChakraProvider theme={theme}>
        <SideMenu />
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
