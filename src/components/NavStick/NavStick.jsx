import { useState } from "react"
import { Link } from "react-router-dom"

const NavStick = ({ user }) => {
  const [route, setRoute] = useState(0)

  const routes = [
    '/',
    '/friends',
    '/profiles',
    '/leaderboard',
    '/change-password',
  ]

  const destination = `${routes[route]}`

  function navstickLeft() {
    route <= 0 ? setRoute(routes.length - 1) : setRoute(route - 1)
  }

  function navstickRight() {
    route >= routes.length - 1 ? setRoute(0) : setRoute(route + 1)
  }

  if (user)
  return (
    <div className="navstick-container">
      <button className="navstick-left" onClick={navstickLeft}>
        <img className="arrow" src="/assets/arrow.png" alt="" />
      </button>
        <p>
          {
            destination === '/'
            ?
            'HOME'
            :
            destination
            .replace('/', '')
            .replace('-', ' ')
            .toUpperCase()
          }
        </p>
      <button className="navstick-right" onClick={navstickRight}>
        Right
      </button>
      <Link to={destination}>
        <button className="navstick-button">
          Navigate
        </button>
      </Link>
    </div>
  )
}

export default NavStick