import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import * as lobbyService from '../../services/lobbyService'

const LobbyList = ({ user, socket }) => {

  const [lobbies, setLobbies] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  }, [])

  // fetch lobbies
  useEffect(() => {
    const fetchAllLobbies = async () => {
      const data = await lobbyService.index()
      setLobbies(data)
    }
    if (user) fetchAllLobbies()
    setRefresh(0)
  }, [refresh])
  
  socket.on('refreshLobby', () => {setRefresh(1)})

  const updateForm = msg => {
    setFormData(msg)
  }

  const handleChange = e => {
    updateForm('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt =>{
    evt.preventDefault()
    socket.emit('refreshLobby')
    setRefresh(refresh+1)
    try {
      const newLobby = await lobbyService.create(formData)
      setLobbies([...lobbies, newLobby] )
    } catch (err){
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    socket.emit('refreshLobby')
    setRefresh(refresh-1)
    try {
      const oldLobby = await lobbyService.delete(id)
      setLobbies(lobbies.filter(lobby => lobby._id !== oldLobby._id))
    } catch (err){
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="space-invaders">L O B B I E S</h1>
      <div id="lobby-container" className="space-invaders">
      {lobbies.map((lobby, idx) => (
        <div key={lobby._id} className="lobbyCard">
          <Link to={`/lobby/${lobby._id}`} >
            <div>
              {/* <h2>Lobby {idx + 1}</h2> */}
              <h3>Name: {lobby.name}</h3>
              <h3>Description: {lobby.content}</h3>
              <h3>Members: {lobby.members.length}</h3>
            </div>
          </Link>
              <button onClick={() => handleDelete(lobby._id)}>DELETE</button>
        </div>
      ))}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form"
      >
        <div>
          <label htmlFor="name">Lobby Name:</label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Description:</label>
          <input
            type="text"
            autoComplete="off"
            id="content"
            value={formData.content}
            name="content"
            onChange={handleChange}
          />
        </div>
        <div className='button-container'>
          <button>NEW LOBBY</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default LobbyList