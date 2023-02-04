const Lobby = ({ lobbies, user }) => {
  return (
    <>
      <h1>This is the lobby component</h1>
      {lobbies.map(lobby => (
        lobby.name
      ))}
    </>
  )
}

export default Lobby