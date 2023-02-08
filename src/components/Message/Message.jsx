const Message = ({ user, message, deleteMessage }) => {
  return (
    <>
      <div>
        {message.content} - {message.from}
      </div>
      {message.sender === user.profile ? 
        <button onClick={() => deleteMessage(message._id)}>Delete</button>
        :
        ""
      }
    </>
  )
}

export default Message