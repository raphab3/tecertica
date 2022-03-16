import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { firebaseConfigEnv } from './env'

const firebaseConfig = {
  apiKey: firebaseConfigEnv.apiKey,
  authDomain: firebaseConfigEnv.authDomain,
  projectId: firebaseConfigEnv.projectId,
  storageBucket: firebaseConfigEnv.storageBucket,
  messagingSenderId: firebaseConfigEnv.messagingSenderId,
  appId: firebaseConfigEnv.appId,
  measurementId: firebaseConfigEnv.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
