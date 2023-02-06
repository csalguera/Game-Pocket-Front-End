import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Services
import * as lobbyService from '../../services/lobbyService'


const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState('')
  const [message, setMessage] = useState('')
  const [chatroomMessages, setChatroomMessages] = useState([])

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
    }
    fetchLobby()
  }, [id])

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
      setChatroomMessages([...chatroomMessages, message])
      setMessage('')
    } catch (err) {
      console.log(err);
    }
  }
  
  if (!lobby) return <h1>Loading</h1>
  console.log(chatroomMessages);
  // console.log(lobby.mainroom);
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
        <form
        autoComplete='off'
        onSubmit={handleSendMessage}
        >
          <div>
            <label htmlFor="message">Message</label>
            <input 
              type="text"
              name='message'
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Send</button>
          </div>
        </form>
      </h2> 
    </>
  )
}

export default LobbyRoom