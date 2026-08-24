import { useCollection } from '../api'

function Teams() {
  const { items, loading, error } = useCollection('teams')

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Team hub</p>
          <h1>Find your pace</h1>
        </div>
        <span className="count-badge">{items.length} teams</span>
      </div>
      {loading && <p className="status">Loading teams...</p>}
      {error && <p className="status error">Could not load teams: {error}</p>}
      {!loading && !error && (
        <div className="data-grid">
          {items.map((team) => (
            <article className="data-card" key={team._id || team.name}>
              <div className="team-icon">+</div>
              <div>
                <h2>{team.name}</h2>
                <p>{team.memberEmails?.length || 0} members</p>
                <small>{team.memberEmails?.join(' · ')}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams