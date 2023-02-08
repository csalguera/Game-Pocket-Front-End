const Chatroom = ({ chatroom }) => {

  return (
    <>
      <h3>
        {chatroom.name} - Members: {chatroom.members?.length}
      </h3>
      <button>Join</button>
    </>
  )
}

export default Chatroom