import { useCollection } from '../api'

function Activities() {
  const { items, loading, error } = useCollection('activities')

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Activity feed</p>
          <h1>Recent movement</h1>
        </div>
        <span className="count-badge">{items.length} logged</span>
      </div>
      {loading && <p className="status">Loading activities...</p>}
      {error && <p className="status error">Could not load activities: {error}</p>}
      {!loading && !error && (
        <div className="data-grid">
          {items.map((activity) => (
            <article className="data-card activity-card" key={activity._id || `${activity.userEmail}-${activity.completedAt}`}>
              <span className="activity-mark">{activity.type?.charAt(0) || 'A'}</span>
              <div>
                <h2>{activity.type}</h2>
                <p>{activity.userEmail}</p>
                <strong>{activity.durationMinutes} min</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities