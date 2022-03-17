import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { firebaseConfigEnv } from './env'
import {
  getAuth
} from 'firebase/auth'

import {
  getFirestore
} from 'firebase/firestore'

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
export const auth = getAuth(app)
export const db = getFirestore(app)
