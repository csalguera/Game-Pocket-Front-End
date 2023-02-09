import { useState } from "react"
import { Link } from "react-router-dom"

import * as chatroomService from '../../services/chatroomService'

const ChatroomList = ({ chatroom, handleDeleteChatroom, user }) => {

  const handleJoinChatroom = async (members, id) => {
    console.log(members)
    if(!members.some(member => member === user.profile)) 
    await chatroomService.joinChatroom(id)
  }


  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <div id="button-container">
        <Link to={`/chatroom/${chatroom._id}`}>
          <button onClick={handleJoinChatroom}>
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
      </div>
    </>
  )
}

export default ChatroomList