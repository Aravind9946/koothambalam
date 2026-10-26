
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink
        className="brand"
        to="/"
        aria-label="Koothambalam home"
      >
        <span className="brand-mark" aria-hidden="true">
          ❋
        </span>
        <span className="brand-name">
          Koothambalam
          <small>Indian Classical Dance School</small>
        </span>
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">
          About Us
        </NavLink>
        <NavLink to="/what-we-offer">
          What We Offer
        </NavLink>
        <NavLink to="/gallery">
          Gallery
        </NavLink>
        <NavLink to="/events">
          Events
        </NavLink>
        <NavLink to="/contact">
          Contact
        </NavLink>
      </nav>

      <NavLink className="header-cta" to="/contact">
        Enrol Now <span>↗</span>
      </NavLink>
    </header>
  );
}
