
import { Link } from "react-router-dom";

const schoolStats = [
  { value: "20+", label: "Years of Experience", icon: "♧" },
  { value: "500+", label: "Students Trained", icon: "♙" },
  { value: "15+", label: "Performances & Awards", icon: "☆" },
];

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-container">
        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span aria-current="page">About Us</span>
        </nav>

        <div className="about-main">
          <div className="about-copy">
            <p className="about-eyebrow">OUR STORY</p>

            <h1>About Us</h1>

            <h2>Guided by passion. Rooted in tradition.</h2>

            <p>
              Koothambalam is founded and led by Smt. Ananya Nair,
              a dedicated Indian classical dance teacher with over
              20 years of experience in Bharatanatyam and other
              classical dance forms.
            </p>

            <p>
              Through dedicated teaching and a deep commitment to
              the art, we help students discover the joy, discipline,
              and cultural heritage of Indian classical dance.
            </p>

            <Link className="about-learn-more" to="/what-we-offer">
              Learn More <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="about-portrait">
            <img
              src="/images/about_teacher.jpg"
              alt="Indian classical dancer in traditional costume"
            />
          </div>
        </div>

        <div className="about-stats">
          {schoolStats.map((stat) => (
            <article className="about-stat-card" key={stat.label}>
              <span className="about-stat-icon" aria-hidden="true">
                {stat.icon}
              </span>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
