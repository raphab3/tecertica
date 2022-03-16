import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { firebaseConfigEnv } from './env'

const firebaseConfig = {
  apiKey: 'AIzaSyCq6IixaRAvSe9mFV013TinrN2kTexg0ZQ',
  authDomain: 'tecertifica-b3aaa.firebaseapp.com',
  projectId: 'tecertifica-b3aaa',
  storageBucket: 'tecertifica-b3aaa.appspot.com',
  messagingSenderId: '1092011869045',
  appId: '1:1092011869045:web:f5a5e1dd21147b4c23493c',
  measurementId: 'G-PCW2P7VXPN'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
