
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider >
  )
}
