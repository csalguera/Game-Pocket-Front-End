const ChatroomList = ({ chatroom, handleJoinChatroom, handleDeleteChatroom, user }) => {
  
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
        <button onClick={() => handleDeleteChatroom()}>
          Delete
        </button>
        :
        ''
      }
    </>
  )
}

export default ChatroomList