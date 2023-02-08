import * as tokenService from "./tokenService"
import { create as createChatroom } from "./chatroomService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/lobbies`

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (lobbyData) => {
  try {
    const chatroom = await createChatroom({name: lobbyData.name})
    lobbyData.mainroom = chatroom._id
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lobbyData)
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

const show = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`},
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

const deleteLobby = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const addChatroom = async (lobbyId, chatroomId) => {
  try {
    const res = await fetch(`${BASE_URL}/${lobbyId}/${chatroomId}/add-chatroom`, {
      method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenService.getToken()}`,
          'Content-Type': 'application/json'
      }
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

const joinLobby = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/join-lobby`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  create,
  show,
  deleteLobby as delete,
  addChatroom,
  joinLobby,
}