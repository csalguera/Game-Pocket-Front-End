import FriendDetails from "../FriendDetails/FriendDetails"

const FriendList = ({ friends }) => {
  return (
    <>
      <h1>Friends</h1>
      <FriendDetails friends={friends}/>
    </>
  )
}

export default FriendList