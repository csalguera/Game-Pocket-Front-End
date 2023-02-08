import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import * as profileService from '../../services/profileService'
import { socket } from "../../services/socket"

const MyPage = ({ user }) => {
  const [profile, setProfile] = useState('')
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.myPage()
      setProfile(data)
    }
    fetchProfile()
    setRefresh(0)
  }, [refresh])

  socket.on('friendRequest', () => setRefresh(1))

  const handleAccept = async (friendId) => {
    try {
      const newProfile = await profileService.acceptFriendRequest(friendId)
      setProfile(newProfile)
      socket.emit('friendRequest')
    } catch (err){
      console.log(err);
    }
  }

  const handleDeny = async (friendId) => {
    try {
      const newProfile = await profileService.denyFriendRequest(friendId)
      setProfile(newProfile)
      socket.emit('friendRequest')
    } catch (err){
      console.log(err);
    }
  }

  const handleBreakUp = async (friendId) => {
    try {
      const newProfile = await profileService.breakupFriend(friendId)
      setProfile(newProfile)
      socket.emit('friendRequest')
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
          <ul>
            {profile.friends.map(friend =>
              <li key={friend._id}>
                <h3>{friend.name}</h3>
                <button style={{backgroundColor:"red"}} onClick={() => handleBreakUp(friend._id)} >Brock Up</button>   
              </li>
              )}
          </ul>
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
          {profile.friendRequests.map(request =>
          <li key={request._id}>
            <h3>{request.name}</h3>
            <button onClick={() => handleAccept(request._id)}>Accept</button>
            <button style={{backgroundColor:"red"}} onClick={() => handleDeny(request._id)}>Deny</button>   
          </li>
          )}
        </ul>
        : 0
        }
      </h2>
       
    </>
  )
}

export default MyPage