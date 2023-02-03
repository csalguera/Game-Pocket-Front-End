import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <div className={styles.pagehead}>
        <img className={styles.imagehead} src="https://i.imgur.com/POd6u7R.png" alt="pacman-ghost" />
        <h1 className={styles.login}>Sign Up</h1>
        <img className={styles.imagehead} src="https://i.imgur.com/XfSVnUx.png" alt="pacman" />
      </div>
      <main className={styles.container}>
        <p>{message}</p>
        <SignupForm {...props} updateMessage={updateMessage} />
      </main>
    </>
  )
}

export default Signup
