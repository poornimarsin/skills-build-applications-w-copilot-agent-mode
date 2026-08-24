import { useCollection } from '../api'

function Workouts() {
  const { items, loading, error } = useCollection('workouts')

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Training library</p>
          <h1>Choose your next win</h1>
        </div>
        <span className="count-badge">{items.length} workouts</span>
      </div>
      {loading && <p className="status">Loading workouts...</p>}
      {error && <p className="status error">Could not load workouts: {error}</p>}
      {!loading && !error && (
        <div className="data-grid">
          {items.map((workout) => (
            <article className="data-card workout-card" key={workout._id || workout.title}>
              <div className="workout-topline">
                <span className="difficulty">{workout.difficulty}</span>
                <span>{workout.durationMinutes} min</span>
              </div>
              <h2>{workout.title}</h2>
              <p>{workout.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts