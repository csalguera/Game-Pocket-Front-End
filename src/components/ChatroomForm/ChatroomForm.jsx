const ChatroomForm = ({ handleCreateChatroom, handleChange, chatroomInput }) => {
  return (
    <>
      <form
      autoComplete='off'
      onSubmit={handleCreateChatroom}
      >
        <div id="create-chatroom">
          <label htmlFor="name">Create a chatroom: </label>
          <input
            type="text"
            name='name'
            onChange={handleChange}
            value={chatroomInput.name}
            required
          />
          <button>Create</button>
        </div>
      </form>
    </>
  )
}

export default ChatroomForm