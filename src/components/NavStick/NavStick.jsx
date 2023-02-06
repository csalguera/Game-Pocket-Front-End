import { useState } from "react"
import { Link } from "react-router-dom"

const NavStick = () => {
  const [route, setRoute] = useState(0)

  const routes = [
    '/',
    '/friends',
    '/profiles'
  ]

  const destination = `${routes[route]}`

  function navstickRight() {
    route >= routes.length - 1 ? setRoute(0) : setRoute(route + 1)
  }

  console.log(destination)

  return (
    <>
      <button onClick={navstickRight}>
        Right
      </button>
      <Link to={destination}>
        <button>Navigate</button>
      </Link>
    </>
  )
}

export default NavStick