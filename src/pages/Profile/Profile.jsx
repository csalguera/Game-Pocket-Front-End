import { useLocation } from "react-router-dom"

const Profile = () => {
  const location = useLocation()
  console.log(location)
  return (
    <h1>{location.state.name}</h1>
  )
}

export default Profile