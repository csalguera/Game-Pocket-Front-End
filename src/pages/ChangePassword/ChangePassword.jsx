import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import styles from './ChangePassword.module.css'

const ChangePassword = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
    <div className={styles.outer}>
      <div className={styles.page}>
        <div className={styles.head}>
          <h1>C h a n g e<br></br>P a s s w o r d</h1>
          <img src="https://i.imgur.com/ArfuBsE.png" alt="Simpsons Family" />
        </div>
          <main className={styles.container}>
            <p>{message}</p>
            <ChangePasswordForm {...props} updateMessage={updateMessage} />
          </main>
      </div>
    </div>
    </>
  )
}

export default ChangePassword
