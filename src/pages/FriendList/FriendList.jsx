import { useState } from "react"
import Friends from "../../components/Friends/Friends"

const FriendList = () => {
  const [friends, setFriends] = useState([])
  
  return (
    <>
      <h1>Friends</h1>
      <Friends />
    </>
  )
}

export default FriendList