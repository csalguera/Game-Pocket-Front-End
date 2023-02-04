import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import * as lobbyService from '../../services/lobbyService'

const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState(null)

  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
    }
    fetchLobby()
  }, [id])

  console.log('Lobby state:', lobby)
  
  return (
    <>
      <h1>Lobby Room</h1>
    </>
  )
}

export default LobbyRoom