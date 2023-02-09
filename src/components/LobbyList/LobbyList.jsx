import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import * as lobbyService from '../../services/lobbyService'

const LobbyList = ({ user, socket }) => {
  const navigate = useNavigate()
  const [lobbies, setLobbies] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  })

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

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleJoinLobby = async (members, lobbyId) => {
    if(!members.some(memberId => memberId === user.profile)) 
    await lobbyService.joinLobby(lobbyId)
  }

  const handleSubmit = async evt =>{
    evt.preventDefault()
    socket.emit('refreshLobby')
    setRefresh(refresh+1)
    const newLobby = await lobbyService.create(formData)
    setLobbies([...lobbies, newLobby])
    setFormData({
      name: '',
      content: ''
    })
    navigate(`/lobby/${newLobby._id}`)
  }

  const handleDelete = async (id) => {
    socket.emit('refreshLobby')
    setRefresh(refresh-1)
    const oldLobby = await lobbyService.delete(id)
    setLobbies(lobbies.filter(lobby => lobby._id !== oldLobby._id))
  }

  return (
    <>
      <h1 className="space-invaders">L O B B I E S</h1>
      <div id="main-page">
        <div id="image-container">
        <div id="bad-guy-container">
          <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
          <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
          <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
          </div>
          <img src="https://i.imgur.com/9EfKBqu.png" alt="Space invader shot" className="shot" id="left"/>
          <img src="https://i.imgur.com/9EfKBqu.png" alt="Space invader shot" className="shot" id="right"/>
          <img src="https://i.imgur.com/1MHgrcd.png" alt="Spaace invader spaceship" id="good-guy"/>
        </div>
        <div id="lobby-container" className="space-invaders">
          {lobbies.map(lobby => (
            <div key={lobby._id} className="lobbyCard">
              <Link to={`/lobby/${lobby._id}`} onClick={() => handleJoinLobby(lobby.members, lobby._id)}>
                <div>
                  <h3>Name: {lobby.name}</h3>
                  <h3>Description: {lobby.content}</h3>
                  <h3>Members: {lobby.members?.length}</h3>
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
        <div id="image-container">
          <div id="bad-guy-container">
            <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
            <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
            <img src="https://i.imgur.com/Btgwjda.png" alt="Spaace invader bad guy" />
          </div>
          <img src="https://i.imgur.com/9EfKBqu.png" alt="Space invader shot" className="shot" id="right"/>
          <img src="https://i.imgur.com/9EfKBqu.png" alt="Space invader shot" className="shot" id="left"/>
          <img src="https://i.imgur.com/1MHgrcd.png" alt="Space invader spaceship" id="good-guy"/>
        </div>
      </div>
    </>
  )
}

export default LobbyList