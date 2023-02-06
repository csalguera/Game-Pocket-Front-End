import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./NavStick.module.css"

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
    <div className={styles.container}>
      <button className={styles.navstickLeft} onClick={navstickLeft}>
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
            .replace('-', ' ')
            .toUpperCase()
          }
        </p>
      <button className={styles.navstickRight} onClick={navstickRight}>
        Right
      </button>
      <Link to={destination}>
        <button className={styles.navButton}>
          Navigate
        </button>
      </Link>
    </div>
  )
}

export default NavStick