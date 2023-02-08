import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Components
import Message from "../../components/Message/Message"
import MessageForm from "../../components/MessageForm/MessageForm"

// Services
import * as chatroomService from '../../services/chatroomService'

const Chatroom = ({ user }) => {
  const { id } = useParams()
  const [chatroom, setChatroom] =useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchChatroom = async () => {
      const data = await chatroomService.show(id)
      setChatroom(data)
      setMembers(data.members)
      console.log(data.members)
    }
    fetchChatroom()
  }, [])

  const handleJoinChatroom = async (evt) => {
    const data = await chatroomService.update(evt._id)
    setChatroom(data)
    setMembers([...members, user.profile])
    console.log(data)
  }

  return (
    <>
      <h1>{chatroom.name}</h1>
      <h2>
        {members.map(member => (
          member.name
        ))}
      </h2>
      <button onClick={() => handleJoinChatroom(chatroom)}>
        test
      </button>
    </>
  )
}

export default Chatroom