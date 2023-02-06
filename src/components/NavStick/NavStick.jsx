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

  function navstickLeft() {
    route <= 0 ? setRoute(routes.length - 1) : setRoute(route - 1)
  }

  function navstickRight() {
    route >= routes.length - 1 ? setRoute(0) : setRoute(route + 1)
  }

  console.log(destination)

  return (
    <>
      <button onClick={navstickLeft}>
        Left
      </button>
      <p>
      {
            destination === '/'
            ?
            'HOME'
            :
            destination
            .replace('/', '')
            .toUpperCase()
          }
      </p>
      <button onClick={navstickRight}>
        Right
      </button>
      <Link to={destination}>
        <button>
          Navigate
        </button>
      </Link>
    </>
  )
}

export default NavStick