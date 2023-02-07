import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import * as profileService from '../../services/profileService'

const MyPage = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfile(id)
      setProfile(data)
    }
    fetchProfile()
  }, [id])

  const handleSubmit = async evt =>{
    evt.preventDefault()
    try {
      const newProfile = await profileService.sendFriendRequest(profile._id)
      setProfile(newProfile)
    } catch (err){
      console.log(err);
    }
  }

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
      <li><Link to="/change-password" id="change-password">Change Password</Link></li>
      <h2>
        Current Records: {
          profile.records?.length
          ?
          'Loading...'
          :
          'No records yet'
        }
      </h2>
      <h2>
        Friends: {
          profile.friends?.length
          ?
          'Pay $5 to see your friends.'
          :
          'No friends yet'

        }
      </h2>
        <h2>Friend Requests: {profile.friendRequests?.length ? profile.friendRequests?.length : 0}
        </h2>
       
    </>
  )
}

export default MyPage