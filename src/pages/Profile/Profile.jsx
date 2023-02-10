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
    return() => {
      socket.off('friendRequest')
    }
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
    <div className="profile-page" id="simpsons">
      <h1 id="other-profile-name">{profile.name}</h1>
        <div id="profile-body">
            <div className="head-container" id="simpsons">
              <img src={
              profile.photo
              ?
              profile.photo
              :
              "https://i.imgur.com/izJwDia.png"
              }
              alt=""
              width="150px"
              id="profile-photo"/>
            </div>
              <h1>
                {
                  profile.mood?
                  `"${profile.mood}"`
                  :
                  `"..."`
                }
              </h1>
            <div id="hero-container">
              <h2>
                {
                profile.friends?.length
                ?
                `
                Pay $5 to see my ${profile.friends.length} friends.`
                :
                'No friends yet'
                }
              </h2>
              {
              !profile.friendRequests?.filter(requestId => requestId === user.profile).length &&
              !profile.friends?.filter(requestId => requestId === user.profile).length
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
          !profile.friends?.filter(requestId => requestId === user.profile).length
          ?
          <h2>Request Sent</h2>
          :
          <h2>You Are Friends</h2>
        }
        </div>
      </div>
    </div>
  </>
)
}

export default Profile