import Friends from "../../components/Friends/Friends"

const FriendList = ({ friends }) => {
  return (
    <>
      <h1>Friends</h1>
      <Friends friends={friends}/>
    </>
  )
}

export default FriendList