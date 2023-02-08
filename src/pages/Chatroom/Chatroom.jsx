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
    }
    fetchChatroom()
  }, [])

  console.log(chatroom)

  const handleJoinChatroom = async (evt) => {
    const joinChatroom = await chatroomService.update(evt._id)
    setMembers([...members, user.profile])
  }
  return (
    <>
      <h1>test</h1>
    </>
  )
}

export default Chatroom