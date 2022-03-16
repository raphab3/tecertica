const envVar = (variable) => process.env[`REACT_APP_${variable}`]

export const firebaseConfigEnv = {
  apiKey: envVar('apiKey'),
  authDomain: envVar('authDomain'),
  projectId: envVar('projectId'),
  storageBucket: envVar('storageBucket'),
  messagingSenderId: envVar('messagingSenderId'),
  appId: envVar('appId'),
  measurementId: envVar('measurementId')
}

export const env = { firebaseConfigEnv }
