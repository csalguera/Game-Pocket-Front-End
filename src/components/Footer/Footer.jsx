import NavStick from "../NavStick/NavStick"

const Footer = ({ user, handleLogout }) => {
  if (user)
  return (
    <>
      <NavStick user={user} handleLogout={handleLogout} />
      <div className="footer">
        <div className="footer-container">
          <a href="https://github.com/WarmSkin/Game-Pocket-Front-End" target="_blank" rel="noreferrer">GitHub</a>
          <p>|</p>
          <a href="https://github.com/csalguera/Game-Pocket-Front-End/blob/main/attributions.md" target="_blank" rel="noreferrer">Attributions</a>
        </div>
      </div>
    </>
  )
}

export default Footer