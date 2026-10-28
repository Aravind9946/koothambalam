
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type GalleryMedia = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  media_type: "image" | "video";
  media_url: string;
  created_at: string;
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"Images" | "Videos">(
    "Images"
  );
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGallery() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/gallery", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load the gallery.");
        }

        const data = await response.json();

        setMedia(Array.isArray(data.media) ? data.media : []);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("We couldn't load the gallery. Please try again later.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchGallery();

    return () => controller.abort();
  }, []);

  const filteredMedia = media.filter((item) =>
    activeTab === "Images"
      ? item.media_type === "image"
      : item.media_type === "video"
  );

  return (
    <main className="content-page gallery-page">
      <div className="gallery-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span aria-current="page">Gallery</span>
      </div>

      <header className="gallery-heading">
        <h1>Gallery</h1>
        <p>Moments of grace, rhythm and expression.</p>
      </header>

      <div className="gallery-tabs" role="group" aria-label="Gallery type">
        <button
          type="button"
          className={activeTab === "Images" ? "active" : ""}
          aria-pressed={activeTab === "Images"}
          onClick={() => setActiveTab("Images")}
        >
          Images
        </button>

        <button
          type="button"
          className={activeTab === "Videos" ? "active" : ""}
          aria-pressed={activeTab === "Videos"}
          onClick={() => setActiveTab("Videos")}
        >
          Videos
        </button>
      </div>

      {loading ? (
        <p className="gallery-status" role="status">
          Loading gallery...
        </p>
      ) : error ? (
        <div className="gallery-status" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="gallery-video-empty">
          <span aria-hidden="true">
            {activeTab === "Images" ? "✧" : "▶"}
          </span>
          <h2>
            {activeTab === "Images"
              ? "Moments of Grace"
              : "Performances in Motion"}
          </h2>
          <p>
            {activeTab === "Images"
              ? "Our published photographs will appear here soon."
              : "Our published performance videos will appear here soon."}
          </p>
          <Link to="/contact">Get in Touch</Link>
        </div>
      ) : (
        <div className="gallery-photo-grid">
          {filteredMedia.map((item) => (
            <figure className="gallery-photo-card" key={item.id}>
              {item.media_type === "image" ? (
                <img
                  src={item.media_url}
                  alt={item.description || item.title}
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.media_url}
                  controls
                  preload="metadata"
                  aria-label={item.title}
                >
                  Your browser does not support video playback.
                </video>
              )}

              <figcaption>
                <span>{item.title}</span>
                <small>{item.category}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
