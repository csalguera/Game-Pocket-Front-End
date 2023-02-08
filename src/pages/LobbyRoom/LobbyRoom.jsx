import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Components
import Chatroom from '../../components/Chatroom/Chatroom';
import ChatroomForm from '../../components/ChatroomForm/ChatroomForm';
import Message from '../../components/Message/Message';
import MessageForm from '../../components/MessageForm/MessageForm';

// Services
import * as lobbyService from '../../services/lobbyService'
import * as messageService from '../../services/messageService'
import * as chatroomService from '../../services/chatroomService'


const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState('')
  const [message, setMessage] = useState({content: ""})
  const [chatroomMessages, setChatroomMessages] = useState([])
  const [chatroomInput, setChatroomInput] = useState({name: ""})
  const [chatrooms, setChatrooms] = useState([])

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
      setChatroomMessages(data.mainroom.messages)
      setChatrooms(data.chatrooms)
    }
    fetchLobby()
  }, [])

  //message
  const handleChange = e => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    })
    setChatroomInput({
      ...chatroomInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSendMessage = async e =>{
    e.preventDefault()
    try {
      const messageData = await messageService.create(message)
      await chatroomService.addMessage(lobby.mainroom._id, messageData._id)
      setChatroomMessages([...chatroomMessages, messageData])
      setMessage({content: ""})
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMessage = async (id) => {
    try {
      const deletedMessage = await messageService.delete(id)
      setChatroomMessages(chatroomMessages.filter(message => message._id !== deletedMessage._id))
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateChatroom = async e => {
    e.preventDefault()
    const chatroomData = await chatroomService.create(chatroomInput)
    await lobbyService.addChatroom(lobby._id, chatroomData._id)
    setChatrooms([...chatrooms, chatroomData]) //! remove object id once chatroom is populated 
    setChatroomInput({name: ""})
  }

  if (!lobby) return <h1>Loading</h1>
  return (
    <>
    <div id='lobby-room'>
      <h1>LOBBY</h1>
      <div id="lobby-screen">
      <div id="lobby-head">
        <h2>Description: {lobby.content}</h2>
        <h2>
          Current Members: {
            lobby.members?.length
            ?
            lobby.members.map(member => member.name)
            :
            0
          }
        </h2>
        <h2>
          Chatrooms:
        </h2>
          {
            chatrooms?.length
            ?
            chatrooms.map(chatroom => (
              <ul key={chatroom._id}>
                <li><Chatroom chatroom={chatroom} /></li>
              </ul>
            ))
            :
            'No other chatrooms'
          }
        <ChatroomForm
          handleCreateChatroom={handleCreateChatroom}
          handleChange={handleChange}
          chatroomInput={chatroomInput}
        />
      </div>
      <div id="chatroom">
        <div id="message-container">
        {chatroomMessages.map(message =>
        <div key={message._id}>
          <Message
            message={message}
            deleteMessage={deleteMessage}
            user={user}
            />
        </div>
        )}
        </div>
        <div id="send-container">
        <MessageForm
          handleSendMessage={handleSendMessage}
          handleChange={handleChange}
          message={message}
          />
          </div>
      </div>  
      </div>
    </div>
    </>
  )
}

export default LobbyRoom