import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import UpdateForm from '../../components/UpdateForm/UpdateForm'

const UpdateProfile = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <div className="page-head" id="simpsons">
        <img src="https://i.imgur.com/od8UhEW.png" alt="Simpsons Family" />
        <h1>C h a n g e<br></br>P a s s w o r d</h1>
        <img src="https://i.imgur.com/ArfuBsE.png" alt="Simpsons Family" />
      </div>
      <main className="body" id="simpsons">
        <div className='form-container'>
          <p>{message}</p>
          <ChangePasswordForm {...props} updateMessage={updateMessage} />
          <UpdateForm {...props} updateMessage={updateMessage} />
        </div>
      </main>
    </>
  )
}

export default UpdateProfile
