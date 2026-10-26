
export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#home">
        ❋ Koothambalam
      </a>

      <p>Tradition · Discipline · Expression</p>

      <span>
        © {new Date().getFullYear()} Koothambalam. All rights reserved.
      </span>
    </footer>
  );
}
