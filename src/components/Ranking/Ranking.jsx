const Ranking = ({ records, user }) => {
  return (
    <>
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
                  <b>{record.owner}</b>
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
    </>
  );
}

export default Ranking;