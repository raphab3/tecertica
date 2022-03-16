const envVar = (variable) => process.env[`${variable}`]

export const firebaseConfigEnv = {
  // apiKey: envVar('apiKey'),
  // authDomain: envVar('authDomain'),
  // projectId: envVar('projectId'),
  // storageBucket: envVar('storageBucket'),
  // messagingSenderId: envVar('messagingSenderId'),
  // appId: envVar('appId'),
  // measurementId: envVar('measurementId')
  apiKey: 'AIzaSyCq6IixaRAvSe9mFV013TinrN2kTexg0ZQ',
  authDomain: 'tecertifica-b3aaa.firebaseapp.com',
  projectId: 'tecertifica-b3aaa',
  storageBucket: 'tecertifica-b3aaa.appspot.com',
  messagingSenderId: 1092011869045,
  appId: '1:1092011869045:web:f5a5e1dd21147b4c23493c',
  measurementId: 'G-PCW2P7VXPN'
}

export const env = { firebaseConfigEnv }
