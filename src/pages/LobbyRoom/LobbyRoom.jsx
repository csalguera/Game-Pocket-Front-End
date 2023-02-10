import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

// Components
import ChatroomList from '../../components/ChatroomList/ChatroomList';
import ChatroomForm from '../../components/ChatroomForm/ChatroomForm';
import Message from '../../components/Message/Message';
import MessageForm from '../../components/MessageForm/MessageForm';
import Loading from '../Loading/Loading';

// Services
import * as lobbyService from '../../services/lobbyService'
import * as messageService from '../../services/messageService'
import * as chatroomService from '../../services/chatroomService'
import { socket } from '../../services/socket';


const LobbyRoom = ({ user, lobby, setLobby }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState({content: ""})
  const [chatroomMessages, setChatroomMessages] = useState([])
  const [chatroomInput, setChatroomInput] = useState({name: ""})
  const [chatrooms, setChatrooms] = useState([])
  const [refresh, setRefresh] = useState(0)

  const messagesEndRef = useRef(null)

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
      setChatroomMessages(data.mainroom?.messages)
      setChatrooms(data?.chatrooms)
    }
    fetchLobby()
    setRefresh(0)
    return() => {
      socket.off('refreshMessage')
    }
  }, [refresh])

  //SCROLLBAR 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [chatroomMessages])

  socket.on('refreshMessage', () => setRefresh(1))
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
      socket.emit('refreshMessage')
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMessage = async (id) => {
    try {
      const deletedMessage = await messageService.delete(id)
      setChatroomMessages(chatroomMessages.filter(message => message._id !== deletedMessage._id))
      socket.emit('refreshMessage')
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateChatroom = async e => {
    e.preventDefault()
    const newChatroom = await chatroomService.create(chatroomInput)
    await lobbyService.addChatroom(lobby._id, newChatroom._id)
    setChatrooms([...chatrooms, newChatroom])
    setChatroomInput({name: ""})
    navigate(`/chatroom/${newChatroom._id}`)
  }

  const handleDeleteChatroom = async (id) => {
    const deletedChatroom = await chatroomService.delete(id)
    setChatrooms(chatrooms.filter(chatroom => chatroom._id !== deletedChatroom._id))
  }

  const handleLeaveLobby = async (id) => {
    await lobbyService.leaveLobby(id)
  }

  if (!lobby) return <Loading />
  return (
    <>
    <div id='lobby-room'>
      <h1 className='space-invaders'>L O B B Y</h1>
      <div id="lobby-screen">
      <div id="lobby-head">
        <h2>Description: {lobby.content}</h2>
        <h2>
          Current Members: {
            lobby.members?.length
            ?
            lobby.members.length
            :
            0
          }
        </h2>
        <div id="chatrooms">
          <h2 id="chatroom-header">
            Chatrooms:
          </h2>
          <div id="chatroom-list">
            {
              chatrooms?.length
              ?
              chatrooms.map(chatroom => (
                <div key={chatroom._id} id="mini-room">
                  <ChatroomList
                    chatroom={chatroom}
                    handleDeleteChatroom={handleDeleteChatroom}
                    user={user}
                  />
                </div>
              ))
              :
              <h3>No other chatrooms</h3>
            }
          </div>
        </div>
        <ChatroomForm
          handleCreateChatroom={handleCreateChatroom}
          handleChange={handleChange}
          chatroomInput={chatroomInput}
        />
        <div id="leave">
          <Link to='/'>
            <button onClick={() => handleLeaveLobby(lobby._id)}>
              Leave
            </button>
          </Link>
        </div>
      </div>
      <div id="chatroom">
        <div id="message-container">
        {chatroomMessages?.map(message =>
        <div key={message._id}>
          <Message
            message={message}
            deleteMessage={deleteMessage}
            user={user}
          />
        </div>
        )}
        <div ref={messagesEndRef}></div>
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