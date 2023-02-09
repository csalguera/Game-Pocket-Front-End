const Message = ({ user, message, deleteMessage }) => {
  return (
    <>
      {message.sender === user.profile ? 
      <div id="my-message">
        <div className="message-content">
          {message.content}
        </div>
        <button onClick={() => deleteMessage(message._id)}>X</button>
      </div>
      
      :
      <div id="other-message">
        <div className="message-content">
        {message.from}: {message.content}
        </div>
      </div>
      }
    </>
  )
}

export default Message