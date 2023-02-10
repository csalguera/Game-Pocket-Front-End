import * as tokenService from "./tokenService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/messages`

const create = async (messageData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const deleteMessage = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

export {
  create,
  deleteMessage as delete,
}