const MessageForm = ({ handleSendMessage, handleChange, message }) => {
  return (
    <>
      <form
        autoComplete='off'
        onSubmit={handleSendMessage}
      >
        <div>
          <label htmlFor="content">Message</label>
          <input 
            type="text"
            name='content'
            autoComplete="off"
            onChange={handleChange}
            value={message.content}
          />
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
    </>
  )
}

export default MessageForm