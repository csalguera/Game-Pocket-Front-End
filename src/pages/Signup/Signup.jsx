import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <div className="page-head" id="pacman">
        <img src="https://i.imgur.com/POd6u7R.png" alt="pacman-ghost" />
        <h1>Sign Up</h1>
        <img src="https://i.imgur.com/DmSS1RI.gif" alt="pacman" />
      </div>
      <main className="body" id="pacman">
        <div className="form-container">
          <p>{message}</p>
          <SignupForm {...props} updateMessage={updateMessage} />
        </div>
      </main>
    </>
  )
}

export default Signup
