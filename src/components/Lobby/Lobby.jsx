const Lobby = ({ lobbies, user }) => {
  return (
    <>
      <h1>These are the available lobbies</h1>
      {lobbies.map((lobby, idx) => (
        <div>
          <ul>
            <li><h2>Lobby {idx + 1}</h2></li>
            <li><h3>Name: {lobby.name}</h3></li>
            <li><h3>Content: {lobby.content}</h3></li>
            <li><h3>Gamerooms: {lobby.gamerooms}</h3></li>
            <li><h3>Members: {lobby.members}</h3></li>
          </ul>
        </div>
      ))}
    </>
  )
}

export default Lobby