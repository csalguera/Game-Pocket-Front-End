import Ranking from "../../components/Ranking/Ranking"

const Leaderboard = ({ records, user }) => {
  return (
    <Ranking records={records} user={user} />
  )
}

export default Leaderboard