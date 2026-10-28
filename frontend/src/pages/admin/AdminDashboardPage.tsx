
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const navigationItems = [
  { label: "Overview", icon: "◫" },
  { label: "Gallery", icon: "▧" },
  { label: "Events", icon: "▦" },
  { label: "Enquiries", icon: "✉" },
  { label: "Website Content", icon: "▤" },
  { label: "Settings", icon: "⚙" },
];

export default function AdminDashboardPage() {
  const [activePage, setActivePage] = useState("Overview");
  const navigate = useNavigate();

  
const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    navigate("/admin/login", { replace: true });
  }
};


  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">K</span>
          <div>
            <strong>KOOTHAMBALAM</strong>
            <span>ADMINISTRATION</span>
          </div>
        </div>

        <div className="admin-nav-label">WORKSPACE</div>

        <nav className="admin-navigation">
          {navigationItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={
                activePage === item.label
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() => setActivePage(item.label)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">K</div>
            <div>
              <strong>Administrator</strong>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            ↪ <span>Log out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <div className="admin-breadcrumb">Koothambalam / Admin</div>
            <h1>{activePage}</h1>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-status-dot" />
            <span>Workspace</span>
          </div>
        </header>

        <section className="admin-content">
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

          {activePage === "Overview" ? (
            <>
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
                  <span className="admin-stat-note">
                    Images and videos
                  </span>
                </article>

                <article className="admin-stat-card">
                  <span className="admin-stat-icon">▦</span>
                  <p>Events</p>
                  <strong>—</strong>
                  <span className="admin-stat-note">
                    School programmes
                  </span>
                </article>

                <article className="admin-stat-card">
                  <span className="admin-stat-icon">✉</span>
                  <p>Enquiries</p>
                  <strong>—</strong>
                  <span className="admin-stat-note">
                    Contact submissions
                  </span>
                </article>

                <article className="admin-stat-card">
                  <span className="admin-stat-icon">◉</span>
                  <p>Website status</p>
                  <strong className="admin-live-status">Live</strong>
                  <span className="admin-stat-note">
                    Public website
                  </span>
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
                      onClick={() => setActivePage("Gallery")}
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
                      onClick={() => setActivePage("Events")}
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
                      onClick={() => setActivePage("Website Content")}
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
          ) : (
            <section className="admin-panel admin-placeholder">
              <p className="admin-eyebrow">WORKSPACE SECTION</p>
              <h3>{activePage}</h3>
              <p>
                This section's management tools will be added in the next
                steps. Your existing website content remains unchanged.
              </p>
              {activePage === "Gallery" && (
                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={() => navigate("/admin/gallery")}
                >
                  Open gallery management
                </button>
              )}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}
