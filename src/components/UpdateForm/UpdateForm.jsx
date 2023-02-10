import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import { socket } from '../../services/socket'


const UpdateForm = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: props.profile.profile.name,
    mood: props.profile.profile.mood,
  })
  const [photoData, setPhotoData] = useState({})

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangePhoto = (evt) => {
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await profileService.updateProfile(formData, photoData.photo)
      navigate('/my-page')
      socket.emit('changeName')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  console.log(props)

  return (
    <form
    autoComplete="off"
    onSubmit={handleSubmit}
    className="form"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder={props.profile.profile.name}
        />
      </div>
      <div>
        <label htmlFor="mood">Mood</label>
        <input
          type="text"
          autoComplete="off"
          id="mood"
          name="mood"
          onChange={handleChange}
          placeholder={props.profile.profile.mood}
        />
      </div>
      <div id='photo'>
        <label htmlFor="photo-upload">
          Upload Photo
        </label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
          style={{display: 'none'}}
        />
      </div>
      <div className='button-container'>
        <button id="update">
          Update
        </button>
        <Link to="/my-page">
          <button id="cancel">Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default UpdateForm
