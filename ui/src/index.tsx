import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import * as serviceWorker from './serviceWorker'
import './config/firebase.config'
import './global.css'
import { SideMenu } from './components/SideMenu'
import AuthContextProvider from './hooks/Auth'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <AuthContextProvider>

      <App />
    </AuthContextProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
)

serviceWorker.unregister()
