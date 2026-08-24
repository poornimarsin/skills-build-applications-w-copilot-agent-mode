import { useCollection } from '../api'

function Users() {
  const { items, loading, error } = useCollection('users')

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>People in motion</h1>
        </div>
        <span className="count-badge">{items.length} members</span>
      </div>
      {loading && <p className="status">Loading users...</p>}
      {error && <p className="status error">Could not load users: {error}</p>}
      {!loading && !error && (
        <div className="data-grid">
          {items.map((user) => (
            <article className="data-card" key={user._id || user.email}>
              <div className="avatar">{user.name?.charAt(0) || '?'}</div>
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users