import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { env } from './env'
import {
  getAuth
} from 'firebase/auth'

import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: env.firebaseConfigEnv.apiKey,
  authDomain: env.firebaseConfigEnv.authDomain,
  projectId: env.firebaseConfigEnv.projectId,
  storageBucket: env.firebaseConfigEnv.storageBucket,
  messagingSenderId: env.firebaseConfigEnv.messagingSenderId,
  appId: env.firebaseConfigEnv.appId,
  measurementId: env.firebaseConfigEnv.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
