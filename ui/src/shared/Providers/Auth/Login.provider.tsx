import React, { useState } from 'react'
import './style.css'
import { saveToStorage } from 'src/shared/Providers/Storage.provider'

async function loginUser(credentials: any) {
  return { token: '111111111111' }
}

export default function Login({ setToken }: any) {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password
    })
    saveToStorage('token', token)
    setToken(token)
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
                  onChange={(e: any) => setUserName(e.target.value)} />
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
              <button>
                <i className="fa fa-google"></i> Google
              </button>
            </div>
            <div className="last">
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
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
