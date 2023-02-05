const Ranking = ({ records, user }) => {
  return (
    <div>
      <h3>Game Ranking</h3>
      <ol>
        <li>First Place</li>
        <li>Second Place</li>
        <li>Third Place</li>
      </ol>
      {records.map(record => (
        <div key={record._id} >
          <p>{record.owner}</p>
          <p>Game: {record.game}</p>
          <p>Wins: {record.win}</p>
          <p>Losses: {record.loss}</p>
          <p>Win Rate: {Math.floor(record.win / (record.win + record.loss) * 100)}%</p>
        </div>
      ))}
    </div>
  );
}

export default Ranking;