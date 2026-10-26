
const galleryItems = [
  {
    title: "Classical Dance",
    description: "Moments of grace, expression, and tradition.",
  },
  {
    title: "Practice & Rehearsal",
    description: "The dedication behind every performance.",
  },
  {
    title: "Performances",
    description: "Celebrating classical dance on stage.",
  },
  {
    title: "Workshops & Events",
    description: "Learning, sharing, and growing together.",
  },
];

export default function GalleryPage() {
  return (
    <main className="content-page">
      <section>
        <p className="eyebrow">Through the Lens</p>
        <h1>Our Gallery</h1>
        <p>
          Explore moments from our classes, performances, rehearsals,
          and cultural celebrations.
        </p>
      </section>

      <section aria-label="Gallery collections">
        <div className="gallery-page-grid">
          {galleryItems.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
