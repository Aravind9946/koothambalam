
import "../../App.css";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">YOUR WORKSPACE</p>
          <h2>
            Welcome back to
            <br />
            <em>Koothambalam.</em>
          </h2>
          <p className="admin-welcome-copy">
            Manage your school's digital presence, media, and activities
            from one place.
          </p>
        </div>

        <div className="admin-welcome-art" aria-hidden="true">
          <span>K</span>
          <div />
        </div>
      </div>

      <div className="admin-section-heading">
        <div>
          <p className="admin-eyebrow">AT A GLANCE</p>
          <h3>School overview</h3>
        </div>
        <span className="admin-updated-label">Your workspace</span>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-icon">▧</span>
          <p>Gallery media</p>
          <strong>—</strong>
          <span className="admin-stat-note">Images and videos</span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-icon">▦</span>
          <p>Events</p>
          <strong>—</strong>
          <span className="admin-stat-note">School programmes</span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-icon">✉</span>
          <p>Enquiries</p>
          <strong>—</strong>
          <span className="admin-stat-note">Contact submissions</span>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-icon">◉</span>
          <p>Website status</p>
          <strong className="admin-live-status">Live</strong>
          <span className="admin-stat-note">Public website</span>
        </article>
      </div>

      <div className="admin-lower-grid">
        <section className="admin-panel">
          <p className="admin-eyebrow">QUICK ACCESS</p>
          <h3>Manage your website</h3>
          <p>
            Choose an area to continue updating your school's online
            presence.
          </p>

          <div className="admin-quick-actions">
            <button
              type="button"
              onClick={() => window.location.assign("/admin/gallery")}
            >
              <span>▧</span>
              <span>
                <strong>Manage gallery</strong>
                <small>Photos and videos</small>
              </span>
              <span>↗</span>
            </button>

            <button
              type="button"
              onClick={() => window.location.assign("/admin/events")}
            >
              <span>▦</span>
              <span>
                <strong>Manage events</strong>
                <small>Programmes and updates</small>
              </span>
              <span>↗</span>
            </button>

            <button
              type="button"
              onClick={() => window.location.assign("/admin/content")}
            >
              <span>▤</span>
              <span>
                <strong>Website content</strong>
                <small>Public page information</small>
              </span>
              <span>↗</span>
            </button>
          </div>
        </section>

        <section className="admin-panel admin-note-panel">
          <span className="admin-note-symbol">✳</span>
          <p className="admin-eyebrow">A NOTE FOR YOUR WORKSPACE</p>
          <h3>Preserving a living tradition.</h3>
          <p>
            Keep the school's performances, learning, and cultural
            stories thoughtfully presented for your community.
          </p>
          <span className="admin-note-footer">
            KOOTHAMBALAM · CLASSICAL ARTS
          </span>
        </section>
      </div>
    </>
  );
}
