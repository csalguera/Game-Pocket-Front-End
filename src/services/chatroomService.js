import * as tokenService from "./tokenService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/chatrooms`

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const create = async (chatroomData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatroomData)
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const update = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const addMessage = async (chatroomId, messageId) => {
  try {
    const res = await fetch(`${BASE_URL}/addmessage/${chatroomId}/${messageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const deleteChatroom = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const joinChatroom = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/join-chatroom`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const leaveChatroom = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/leave-chatroom`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  create,
  update,
  addMessage,
  deleteChatroom as delete,
  show,
  joinChatroom,
  leaveChatroom,
}