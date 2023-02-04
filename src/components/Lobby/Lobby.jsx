const Lobby = ({ lobbies, user }) => {
  return (
    <>
      <h1>This is the lobby component</h1>
      {lobbies.map(lobby => (
        <ul>
          <li>Name: {lobby.name}</li>
          <li>Content: {lobby.content}</li>
          <li>Gamerooms: {lobby.gamerooms}</li>
          <li>Members: {lobby.members}</li>
        </ul>
      ))}
    </>
  )
}

export default Lobby