const ChatroomList = ({ chatroom, handleJoinChatroom, user }) => {
  
  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <button onClick={() => handleJoinChatroom()}>
        Join
      </button>
      {chatroom.owner === user.profile
        ?
        <button>
          Delete
        </button>
        :
        ''
      }
    </>
  )
}

export default ChatroomList