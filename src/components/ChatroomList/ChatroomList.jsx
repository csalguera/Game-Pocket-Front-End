const ChatroomList = ({ chatroom, handleJoinChatroom, handleDeleteChatroom, user }) => {
  
  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <div id="button-container">

      <button onClick={() => handleJoinChatroom()}>
        Join
      </button>
      {chatroom.owner === user.profile
        ?
        <button onClick={() => handleDeleteChatroom(chatroom._id)}>
          Delete
        </button>
        :
        ''
      }
      </div>
    </>
  )
}

export default ChatroomList