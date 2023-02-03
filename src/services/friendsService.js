import * as tokenService from "./tokenService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/friends`

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

const add = async (friendData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(friendData)
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

const deleteFriend = async () => {

}

export {
  index,
  add,
  show,
  deleteFriend as delete,
}