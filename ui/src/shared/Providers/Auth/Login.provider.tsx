import React, { useState } from 'react'
import './style.css'
import { saveToStorage } from 'src/shared/Providers/Storage.provider'
import { useAuth } from 'src/hooks/Auth'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from 'src/config/firebase.config'

async function loginUser(credentials: any) {
  let signIn: any = {}
  try {
    signIn = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
  } catch (err: any) {
    alert(err.message)
  }
  return { token: signIn.user.accessToken || '' }
}

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { state, setState } = useAuth()

  const googleProvider = new GoogleAuthProvider()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const token = await loginUser({
      email,
      password
    })
    handleSetToken(token.token)
  }

  const signInWithGoogle = async (e: any) => {
    e.preventDefault()
    try {
      const res = await signInWithPopup(auth, googleProvider)

      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email
        })
      }

      if (user) {
        handleSetToken(await user.getIdToken())
      }
    } catch (err) {
      console.error(err)
    }
  }

  function handleSetToken(value: string) {
    saveToStorage('token', value)
    setState({
      ...state,
      token: value
    })
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="top-div">
            <h2>Login </h2>
            <h4>Bem vindo a teCertifique</h4>
          </div>
          <form>
            <div className="sign-in">
              <div className="input-text">
                <input type="text"
                  onChange={(e: any) => setEmail(e.target.value)} />
                <span>Email</span>
              </div>
              <div className="input-text">
                <input type="password" id="password_input"
                  onChange={(e: any) => setPassword(e.target.value)} />{' '}
                <span>Password</span>
              </div>
              <button onClick={handleSubmit}>Sign in</button>
            </div>
            <div className="or">
              <small>or sign in with</small>
            </div>
            <hr />
            <div className="google">
              <button onClick={signInWithGoogle}>
                <i className="fa fa-google"></i> Google
              </button>
            </div>
            {/* <div className="last">
              <div className="facebook">
                <button>
                  <i className="fa fa-facebook"></i> Facebook
                </button>
              </div>
              <div className="twitter">
                {' '}
                <button >
                  <i className="fa fa-twitter"></i> Twitter
                </button>
              </div>
            </div> */}
          </form>

        </div>
      </div>
    </>
  )
}
