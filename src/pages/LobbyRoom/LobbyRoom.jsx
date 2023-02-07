import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Services
import * as lobbyService from '../../services/lobbyService'
import * as messageService from '../../services/messageService'
import * as chatroomService from '../../services/chatroomService'


const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState('')
  const [message, setMessage] = useState({content: ""})
  const [chatroomMessages, setChatroomMessages] = useState([])

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
      setChatroomMessages(data.mainroom.messages)
    }
    fetchLobby()
  }, [])

  //message
  const handleChange = e => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
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
  
  if (!lobby) return <h1>Loading</h1>
  return (
    <>
      <h1>{lobby.name}</h1>
      <h2>Description: {lobby.content}</h2>
      <h2>
        Current Members: {
          lobby.members.length
          ?
          lobby.members.map(member => member.name)
          :
          0
        }
      </h2>
      <h2>
        Chatroom: {lobby.mainroom.name}
      </h2> 
        {chatroomMessages.map(message => 
        <div key={message._id}>
          <div>{message.content} - {message.from}
          </div>
          {message.sender === user.profile ? 
          <button onClick={() => deleteMessage(message._id)}>Delete</button>
          :
          ""
        }
        </div>
        )}
        <form
        autoComplete='off'
        onSubmit={handleSendMessage}
        >
          <div>
            <label htmlFor="content">Message</label>
            <input 
              type="text"
              name='content'
              autoComplete="off"
              onChange={handleChange}
              value={message.content}
            />
          </div>
          <div>
            <button>Send</button>
          </div>
        </form>

    </>
  )
}

export default LobbyRoom