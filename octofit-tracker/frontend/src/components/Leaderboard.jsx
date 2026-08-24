import { useCollection } from '../api'

function Leaderboard() {
  const { items, loading, error } = useCollection('leaderboard')

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Friendly competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">{items.length} ranked</span>
      </div>
      {loading && <p className="status">Loading leaderboard...</p>}
      {error && <p className="status error">Could not load leaderboard: {error}</p>}
      {!loading && !error && (
        <div className="leaderboard-list">
          {items.map((entry) => (
            <article className="rank-row" key={entry._id || entry.userEmail}>
              <span className="rank">{String(entry.rank).padStart(2, '0')}</span>
              <span className="rank-name">{entry.userEmail}</span>
              <strong>{entry.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard