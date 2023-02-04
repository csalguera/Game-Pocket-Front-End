import { Link } from "react-router-dom"

const LobbyList = ({ lobbies, user }) => {
  return (
    <>
      <h1>These are the available lobbies</h1>
      {lobbies.map((lobby, idx) => (
        <div key={lobby._id}>
          <Link to={`/lobby/${lobby._id}`}>
            <ul>
              <li><h2>Lobby {idx + 1}</h2></li>
              <li><h3>Name: {lobby.name}</h3></li>
              <li><h3>Description: {lobby.content}</h3></li>
              <li><h3>Members: {lobby.members}</h3></li>
            </ul>
          </Link>
        </div>
      ))}
    </>
  )
}

export default LobbyList