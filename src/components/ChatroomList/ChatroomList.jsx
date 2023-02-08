import { Link } from "react-router-dom"

const ChatroomList = ({ chatroom, handleJoinChatroom, handleDeleteChatroom, user }) => {
  
  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <Link to={`/chatroom/${chatroom._id}`}
        // chatroom={chatroom}
      >
        test
      </Link>
      <button onClick={() => handleJoinChatroom(chatroom)}>
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
    </>
  )
}

export default ChatroomList