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
      <div className={styles.pagehead}>
        <img src="https://i.imgur.com/e213Pvo.png" alt="pacman" />
        <h1>Log In</h1>
      </div>
      <main className={styles.container}>
        <div id="body-container">
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
