const Chatroom = ({ chatroom, handleJoinChatroom }) => {

  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <button onClick={() => handleJoinChatroom()}>
        Join
      </button>
    </>
  )
}

export default Chatroom