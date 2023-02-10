import { useState } from "react"
import { Link } from "react-router-dom"

const NavStick = ({ user, handleLogout }) => {
  const [route, setRoute] = useState(0)

  const routes = [
    '/',
    '/profiles',
    '/leaderboard',
    '/my-page',
    ''
  ]

  const destination = `${routes[route]}`

  function navstickLeft() {
    route <= 0 ? setRoute(routes.length - 1) : setRoute(route - 1)
  }

  function navstickRight() {
    route >= routes.length - 1 ? setRoute(0) : setRoute(route + 1)
  }

  return (
    <div className="navstick-container">
      <div className="buttons-container">
        <button className="navstick-left" onClick={navstickLeft}>
          <img className="arrow-left" src="/assets/arrow.png" alt="" />
        </button>
          <Link className="navstick-link" to={destination}>
          <p className="destination-name">
            {
              destination === '/'
              ?
              'HOME'
              :
              destination === ''
              ?
              <p onClick={() => handleLogout()}>
                LOG OUT
              </p>
              :
              destination
              .replace('/', '')
              .replace('-', ' ')
              .toUpperCase()
            }
          </p>
          </Link>
        <button className="navstick-right" onClick={navstickRight}>
          <img className="arrow-right" src="/assets/arrow.png" alt="" />
        </button>
      </div>
      <Link className="navstick-destinaiton" to={destination}>
        <button className="navstick-button">
          <p>PUSH</p>
        </button>
      </Link>
    </div>
  )
}

export default NavStick