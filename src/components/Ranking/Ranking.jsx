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
          <table>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Wins
                </th>
                <th>
                  Losses
                </th>
                <th>
                  Win Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {record.owner}
                </td>
                <td>
                  {record.win}
                </td>
                <td>
                  {record.loss}
                </td>
                <td>
                {Math.floor(record.win / (record.win + record.loss) * 100)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Ranking;