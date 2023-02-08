import { useState } from "react"
import { Link } from "react-router-dom"

import * as chatroomService from '../../services/chatroomService'

const ChatroomList = ({ chatroom, handleDeleteChatroom, user }) => {

  const handleJoinChatroom = async (memebers, id) => {
    if(!memebers.some(member => member === user.profile)) 
      try {
        const joinChatroom = await chatroomService.joinChatroom(id)
      } catch (error){
        console.log(error)
      }
  }

  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <Link to={`/chatroom/${chatroom._id}`}
      >
        <button>
          Join
        </button>
      </Link>
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