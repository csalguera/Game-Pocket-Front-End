import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import * as profileService from '../../services/profileService'

const MyPage = ({ user }) => {
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.myPage()
      setProfile(data)
    }
    fetchProfile()
  }, [user])

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
      <Link to="/change-password" id="change-password">Change Password</Link>
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
      <h2>
        Friend Requests: 
        {
        profile.friendRequests?.length 
        ? 
        <ul>
          {profile.friendRequests.map(request => {
            <h3>{request.name}</h3>
          })
          }
        </ul>
        : 0
        }
      </h2>
       
    </>
  )
}

export default MyPage