import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './Login.module.css'

const LoginPage = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <div className="page-head">
        <img src="https://i.imgur.com/POd6u7R.png" alt="pacman-ghost" />
        <h1>Log In</h1>
        <img src="https://i.imgur.com/XfSVnUx.png" alt="pacman" />
      </div>
      <main className='body'>
        <div className='form-container'>
          <p>{message}</p>
          <LoginForm
            handleSignupOrLogin={props.handleSignupOrLogin}
            updateMessage={updateMessage}
            />
        </div>
      </main>
    </>
  )
}

export default LoginPage
