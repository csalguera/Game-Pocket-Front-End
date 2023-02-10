const Ranking = ({ records, user }) => {
  records.sort((a, b) => Math.floor(b.win / (b.win + b.loss) * 100) - Math.floor(a.win / (a.win + a.loss) * 100))

  return (
    <>
      <h1>Game Ranking</h1>
      {records.map((record, idx) => (
        <div key={record._id} >
          <table>
            <thead>
              <tr>
                <th>
                  <b>{record.owner}</b>
                </th>
                <th>
                  Rank
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
                  
                </td>
                <td>
                  {idx + 1}
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
  )
}

export default Ranking;