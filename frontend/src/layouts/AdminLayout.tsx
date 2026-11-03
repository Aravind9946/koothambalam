
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const navigationItems = [
  { label: "Overview", icon: "◫", path: "/admin/dashboard" },
  { label: "Gallery", icon: "▧", path: "/admin/gallery" },
  { label: "Events", icon: "▦", path: "/admin/events" },
  { label: "Enquiries", icon: "✉", path: "/admin/enquiries" },
  { label: "Website Content", icon: "▤", path: "/admin/content" },
  { label: "Settings", icon: "⚙", path: "/admin/settings" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage =
    navigationItems.find((item) => item.path === location.pathname);

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
                location.pathname === item.path
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() => navigate(item.path)}
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
            <div className="admin-breadcrumb">
              Koothambalam / Admin
            </div>
            <h1>{currentPage?.label || "Workspace"}</h1>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-status-dot" />
            <span>Workspace</span>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
