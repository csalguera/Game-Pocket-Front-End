import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
    {/* <div id="pacman-container-container">
    </div> */}
      <div className="page-head" id="pacman">
        <h1>Sign Up</h1>
      </div>
      <main className="body" id="pacman">
    <div id="pacman-container">
      <img src="https://i.imgur.com/YGNuDWz.gif" alt="pacman" id="ms-pacman"/>
    </div>
        <div className="form-container">
          <p>{message}</p>
          <SignupForm {...props} updateMessage={updateMessage} />
        </div>
      </main>
    </>
  )
}

export default Signup
