
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Home } from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Login from './shared/Providers/Auth/Login.provider'
import { getFromStorage } from './shared/Providers/Storage.provider'

export const App = () => {
  const [token, setToken] = useState()
  const tokenStorage = getFromStorage('token')
  if (!token && !tokenStorage) {
    return <Login setToken={setToken} />
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>,
    </ChakraProvider >
  )
}
