
import { useEffect, useState } from "react";
import "../../App.css";
import { getDanceForms, type DanceForm } from "../../services/danceFormService";

export default function HomePage() {
  const [danceForms, setDanceForms] = useState<DanceForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDanceForms() {
      try {
        const data = await getDanceForms();
        setDanceForms(data.danceForms);
      } catch {
        setError("Dance forms could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadDanceForms();
  }, []);

  const activeDanceForms = danceForms.filter(
    (danceForm) => danceForm.is_active
  );

  return (
    <div className="site-shell">
    <main>
      <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">TRADITION <span>•</span> DISCIPLINE <span>•</span> EXPRESSION</p>
            <h1>
              Where Tradition
              <br />
              Finds <em>Expression.</em>
            </h1>
            <p className="hero-description">
              Koothambalam is a space dedicated to learning, practising and
              celebrating the timeless beauty of Indian classical dance.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#dance-forms">
                Explore Classes <span>→</span>
              </a>
              <a className="button-outline" href="#contact">Contact Us</a>
            </div>
          </div>

          <div className="hero-scroll">
            <span aria-hidden="true">↓</span> Scroll Down
          </div>
        </section>

        <section className="about-strip" id="about">
          <div className="about-copy">
            <p className="section-eyebrow">ABOUT KOOTHAMBALAM</p>
            <h2>Preserving Heritage,<br />Inspiring Generations</h2>
            <p>
              Koothambalam is dedicated to preserving Indian classical dance
              traditions and nurturing the next generation of artists,
              performers and cultural ambassadors.
            </p>
            <a className="button-primary" href="#contact">Learn More <span>→</span></a>
          </div>

          <div className="stat">
            <span className="stat-icon">✳</span>
            <strong>6+</strong>
            <span>Classical Dance Forms</span>
          </div>
          <div className="stat">
            <span className="stat-icon">♧</span>
            <strong>20+</strong>
            <span>Years of Experience</span>
          </div>
          <div className="stat">
            <span className="stat-icon">☆</span>
            <strong>500+</strong>
            <span>Students Trained</span>
          </div>
          <div className="stat">
            <span className="stat-icon">♙</span>
            <strong>15+</strong>
            <span>Awards &amp; Recognition</span>
          </div>
        </section>

        <section className="dance-section" id="dance-forms">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">OUR DANCE FORMS</p>
              <h2>Discover the Rich Traditions</h2>
            </div>
            <a className="view-all" href="#contact">View All Dance Forms <span>→</span></a>
          </div>

          {loading && <p className="status-message">Loading dance forms...</p>}
          {error && <p className="status-message" role="alert">{error}</p>}

          {!loading && !error && activeDanceForms.length === 0 && (
            <p className="status-message">Dance forms will appear here soon.</p>
          )}

          {!loading && !error && activeDanceForms.length > 0 && (
            <div className="dance-grid">
              {activeDanceForms.map((danceForm, index) => (
                <article className="dance-card" key={danceForm.id}>
                  <div className={`dance-card-art dance-art-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="card-flower" aria-hidden="true">✳</span>
                  </div>
                  <div className="dance-card-copy">
                    <h3>{danceForm.name}</h3>
                    <p>{danceForm.description}</p>
                    <a href="#contact">Learn More <span>→</span></a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="simple-section" id="gallery">
          <p className="section-eyebrow">MOMENTS OF GRACE, RHYTHM AND EXPRESSION</p>
          <h2>Gallery</h2>
          <p>Explore our dance photographs and videos.</p>
        </section>

        <section className="simple-section events-section" id="events">
          <p className="section-eyebrow">JOIN US IN CELEBRATION</p>
          <h2>Upcoming Events</h2>
          <p>Performances, workshops and special programs will be featured here.</p>
        </section>

        <section className="contact-banner" id="contact">
          <p className="section-eyebrow">YOUR JOURNEY BEGINS HERE</p>
          <h2>Let the Rhythm Move You</h2>
          <p>Contact us to learn more about classes and enrolment.</p>
          <a className="button-primary" href="mailto:hello@koothambalam.example">
            Enquire About Classes <span>→</span>
          </a>
        </section>
      </main>
    </div>
  );
}

