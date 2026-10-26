
import { useEffect, useState } from "react";
import {
  getDanceForms,
  type DanceForm,
} from "../../services/danceFormService";

export default function WhatWeOfferPage() {
  const [danceForms, setDanceForms] = useState<DanceForm[]>([]);
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

  return (
    <main className="content-page">
      <section>
        <p className="eyebrow">Explore Our Traditions</p>
        <h1>What We Offer</h1>
        <p>
          Discover the diverse traditions of Indian classical dance
          and find a path to begin your learning journey.
        </p>
      </section>

      <section aria-labelledby="dance-forms-heading">
        <h2 id="dance-forms-heading">Our Dance Forms</h2>

        {loading && <p>Loading dance forms…</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && danceForms.length === 0 && (
          <p>Dance forms will be announced soon.</p>
        )}

        {!loading && !error && danceForms.length > 0 && (
          <div className="offer-list">
            {danceForms.map((form) => (
              <article key={form.id}>
                <h3>{form.name}</h3>
                <p>
                  {form.description ||
                    "Discover this classical dance tradition at Koothambalam."}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
