const Message = ({ user, message, deleteMessage }) => {
  console.log(user);
  return (
    <>
      {message.sender === user.profile ? 
      <div id="my-message">
        <div className="message-content">
          {message.content} - {message.from}
        </div>
        <button onClick={() => deleteMessage(message._id)}>X</button>
      </div>
      
      :
      <div id="other-message">
        <div className="message-content">
        {message.content} - {message.from}
        </div>
      </div>
      }
    </>
  )
}

export default Message