import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as profileService from '../../services/profileService'

const Profile = ({ user, socket }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState('')
  const [refresh, setRefresh] = useState(0)
  

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfile(id)
      setProfile(data)
    }
    fetchProfile()
    setRefresh(0)
  }, [refresh])

  socket.on('friendRequest', () => setRefresh(1))

  const handleSubmit = async evt =>{
    evt.preventDefault()
    try {
      const newProfile = await profileService.sendFriendRequest(profile._id)
      setProfile(newProfile)
      socket.emit('friendRequest')
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
      {
        profile.friendRequests?.filter(requestId => requestId === user.profile).length === 0
        ?
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <button>Send Friend Request</button>
          </div>
        </form>
        :
        <h2>Request Sent</h2>
      }
    </>
  )
}

export default Profile