const Chatroom = ({ chatroom, chatrooms }) => {
  return (
    <>
      {chatroom.name} - Members: {chatroom.members?.length}
      <button>Join</button>
    </>
  )
}

export default Chatroom