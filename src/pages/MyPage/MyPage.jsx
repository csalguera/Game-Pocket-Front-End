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
    <div className="profile-page" id="simpsons">
      <h1>P R O F I L E</h1>
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
          />
            <Link to="/update-profile" id="update-profile">Update Profile</Link>
          </div>
      <h2> Friends:</h2> 
      {
          profile.friends?.length
          ?
          <div className="friends-container" id="simpsons">
            {profile.friends.map(friend =>
              <div key={friend._id}>
                <h3>{friend.name}</h3>
                <button onClick={() => handleBreakUp(friend._id)} id="break-up">Break Up</button>   
              </div>
              )}
          </div>
          :
          'No friends yet'
        }
      {/* </h2> */}
      <h2>
        Friend Requests:</h2> 
        {
          profile.friendRequests?.length 
          ? 
          <div className="friend-requests" id="simpsons">
          {profile.friendRequests.map(request =>
          <div key={request._id}>
            <h3>{request.name}</h3>
            <button onClick={() => handleAccept(request._id)} id="accept">Accept</button>
            <button onClick={() => handleDeny(request._id)} id="break-up">Deny</button>   
          </div>
          )}
        </div>
        : 0
      }
      </div>
    </div>
    </>
  )
}

export default MyPage