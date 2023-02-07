import { useParams } from "react-router-dom"

const Profile = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <>
    </>
  )
}

export default Profile