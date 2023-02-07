import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as profileService from '../../services/profileService'

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfile(id)
      setProfile(data)
    }
    fetchProfile()
  }, [id])
  console.log(profile)

  return (
    <>
      <h1>{profile.name}</h1>
      <img src={
        profile.photo
        ?
        profile.photo
        :
        "https://i.imgur.com/izJwDia.png"
      }
        alt=""
        width="150px"
      />
      <h2>
        Current Records: {
          profile.records
          ?
          profile.records
          :
          'No records yet'
        }
      </h2>
      <h2>
        Friends: {
          profile.friends
          ?
          profile.friends
          :
          'No friends yet'
        }
      </h2>
    </>
  )
}

export default Profile