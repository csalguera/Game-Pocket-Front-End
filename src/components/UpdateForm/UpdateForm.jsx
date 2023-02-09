import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as profileService from '../../services/profileService'


const UpdateForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    mood: '',
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
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, mood } = formData

  const isFormInvalid = () => {
    return !(name && mood)
  }

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
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="mood">Mood</label>
        <input
          type="text"
          autoComplete="off"
          id="mood"
          value={mood}
          name="mood"
          onChange={handleChange}
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
        />
      </div>
      <div className='button-container'>
        <button disabled={isFormInvalid()}>
          Update
        </button>
        <Link to="/my-page">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default UpdateForm
