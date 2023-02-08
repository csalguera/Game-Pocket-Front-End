const Message = ({ user, message, deleteMessage }) => {
  return (
    <>
      {message.sender === user.profile ? 
      <div id="my-message">
        {message.content} - {message.from}
        <button onClick={() => deleteMessage(message._id)}>X</button>
      </div>
      
      :
      <div id="other-message">
        {message.content} - {message.from}
      </div>
      }
    </>
  )
}

export default Message