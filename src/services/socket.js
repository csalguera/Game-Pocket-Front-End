import io from 'socket.io-client'

export const socket = io('http://localhost:3001', {
  transports:['websocket']
})

socket.on("connect", () => {
  console.log("connet to server"); // x8WIv7-mJelg7on_ALbx
});