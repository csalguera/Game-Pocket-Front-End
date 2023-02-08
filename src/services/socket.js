import io from 'socket.io-client'

export const socket = io(process.env.REACT_APP_BACK_END_SERVER_URL, {
  transports:['websocket']
})

socket.on("connect", () => {
  console.log("connet to server"); // x8WIv7-mJelg7on_ALbx
});