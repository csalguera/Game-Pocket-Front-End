import * as tokenService from './tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

async function getProfile(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function sendFriendRequest(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/send-friend-request`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function myPage() {
  const res = await fetch(`${BASE_URL}/myPage`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function acceptFriendRequest(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/accept-friend-request`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function breakupFriend(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/breakup-friendship`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function denyFriendRequest(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/deny-friend-request`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json()
}

async function updateProfile(formData, photo) {
  console.log(formData)
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
       },
      body: JSON.stringify(formData),
    })
    const profile = await res.json()
    console.log(profile)
    if (photo) {
      const photoData = new FormData()
      photoData.append('photo', photo)
      return await addPhoto(
        photoData,
        profile._id
      )
    }
  } catch (err) {
    throw err
  }
}

export { 
  getAllProfiles,
  addPhoto,
  getProfile,
  sendFriendRequest,
  myPage,
  acceptFriendRequest,
  denyFriendRequest,
  breakupFriend,
  updateProfile,
}
