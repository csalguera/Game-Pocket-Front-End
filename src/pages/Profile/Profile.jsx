import { Location, useLocation } from "react-router-dom"

const Profile = () =>{
  const location = useLocation()
  return (
    <h1>{location.state.name}</h1>
  )
}

export default Profile