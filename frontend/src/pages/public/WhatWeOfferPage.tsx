
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDanceForms,
  type DanceForm,
} from "../../services/danceFormService";

const danceImages: Record<string, string> = {
  Bharatanatyam: "/images/bharatanatyam.jpg",
  Kathak: "/images/kathak.jpg",
  Kathakali: "/images/kathakali.jpg",
  Kuchipudi: "/images/kuchipudi.jpg",
  Mohiniyattam: "/images/mohiniyattam.jpg",
  Odissi: "/images/odissi.jpg",
};

const danceTaglines: Record<string, string> = {
  Bharatanatyam: "Grace · Strength · Expression",
  Kathak: "Footwork · Spins · Expression",
  Kathakali: "Drama · Colour · Storytelling",
  Kuchipudi: "Rhythm · Storytelling · Energy",
  Mohiniyattam: "Elegance · Fluidity · Beauty",
  Odissi: "Spirituality · Precision · Grace",
};

const categories = ["All", "Bharatanatyam", "Mohiniyattam", "Kuchipudi", "Odissi", "Kathak"];

export default function WhatWeOfferPage() {
  const [danceForms, setDanceForms] = useState<DanceForm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDanceForms()
      .then((data) =>
        setDanceForms(data.danceForms.filter((form) => form.is_active))
      )
      .catch(() =>
        setError("Dance forms could not be loaded. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  const visibleForms =
    selectedCategory === "All"
      ? danceForms
      : danceForms.filter(
          (form) => form.name.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <main className="content-page offer-page">
      <div className="offer-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span aria-current="page">What We Offer</span>
      </div>

      <header className="offer-heading">
        <h1>What We Offer</h1>
        <p>Explore the rich traditions of Indian classical dance.</p>
      </header>

      <nav className="offer-filters" aria-label="Filter dance forms">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {loading && <p className="offer-status">Loading dance forms…</p>}

      {error && (
        <p className="offer-status" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && danceForms.length === 0 && (
        <p className="offer-status">
          Dance forms will be announced soon.
        </p>
      )}

      {!loading && !error && danceForms.length > 0 && (
        <div className="offer-card-grid">
          {visibleForms.map((form) => {
            const image = danceImages[form.name];
            const tagline =
              danceTaglines[form.name] || "Tradition · Rhythm · Expression";

            return (
              <article className="offer-dance-card" key={form.id}>
                <div className="offer-card-image">
                  {image ? (
                    <img
                      src={image}
                      alt={`${form.name} classical dance`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="offer-image-placeholder">
                      Koothambalam
                    </div>
                  )}
                </div>

                <div className="offer-card-body">
                  <h2>{form.name}</h2>
                  <p className="offer-tagline">{tagline}</p>
                  <p className="offer-description">
                    {form.description ||
                      "Discover this classical dance tradition at Koothambalam."}
                  </p>
                 
                </div>
              </article>
            );
          })}

          <article className="offer-levels-card">
            <span className="offer-levels-icon" aria-hidden="true">♧</span>
            <h2>Class Levels</h2>
            <p>Beginner to Advanced</p>
            <p>Classes for children and adults.</p>
            <Link to="/contact" className="offer-learn-link">
              View Schedule <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      )}
    </main>
  );
}
