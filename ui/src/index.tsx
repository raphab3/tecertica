import { ColorModeScript, theme } from '@chakra-ui/react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import * as serviceWorker from './serviceWorker'
import './config/firebase.config'
import './global.css'
import AuthContextProvider from './hooks/Auth'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript
      initialColorMode={(theme.config.initialColorMode = 'dark')}
    />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
