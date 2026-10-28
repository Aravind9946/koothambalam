
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      window.alert(data.message || "Login failed.");
      return;
    }

    window.location.href = "/admin/dashboard";
  } catch (error) {
    console.error("Admin login error:", error);
    window.alert(
      "Unable to connect to the server. Please check that the backend is running."
    );
  }
};


  return (
    <main className="admin-login-page">
      <section className="admin-login-brand">
        <Link to="/" className="admin-login-brand-name">
          KOOTHAMBALAM
        </Link>

        <span className="admin-login-brand-rule" />

        <p className="admin-login-eyebrow">THE ART OF CLASSICAL DANCE</p>

        <h1>
          Preserving tradition.
          <br />
          Inspiring expression.
        </h1>

        <p className="admin-login-brand-description">
          Manage your school's gallery, events and content from one place.
        </p>

        <p className="admin-login-quote">
          “Where rhythm meets devotion, tradition comes alive.”
        </p>
      </section>

      <section className="admin-login-panel">
        <div className="admin-login-form-wrap">
          <Link to="/" className="admin-login-back">
            ← Back to website
          </Link>

          <p className="admin-login-eyebrow">ADMINISTRATION</p>
          <h2>Welcome back</h2>
          <p className="admin-login-subtitle">
            Sign in to manage Koothambalam.
          </p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <div className="admin-login-password-heading">
              <label htmlFor="admin-password">Password</label>
              <Link to="/admin/forgot-password">
                Forgot password?
              </Link>
            </div>

            <div className="admin-login-password-field">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="admin-login-submit" type="submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="admin-login-security-note">
            Restricted access for authorised administrators.
          </p>
        </div>
      </section>
    </main>
  );
}
