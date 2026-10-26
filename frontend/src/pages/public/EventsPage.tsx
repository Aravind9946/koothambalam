
const eventCategories = [
  {
    title: "Performances",
    description:
      "Discover opportunities to experience Indian classical dance on stage.",
  },
  {
    title: "Workshops",
    description:
      "Explore learning experiences that deepen your understanding of dance.",
  },
  {
    title: "Cultural Celebrations",
    description:
      "Celebrate the traditions, stories, and artistry of Indian classical dance.",
  },
];

export default function EventsPage() {
  return (
    <main className="content-page">
      <section>
        <p className="eyebrow">What's Happening</p>
        <h1>Events & Performances</h1>
        <p>
          Explore performances, workshops, and cultural experiences
          connected with Koothambalam.
        </p>
      </section>

      <section aria-label="Event categories">
        <div className="events-page-grid">
          {eventCategories.map((category) => (
            <article key={category.title}>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Upcoming Events</h2>
        <p>
          Event announcements will appear here when dates and details
          are confirmed.
        </p>
      </section>
    </main>
  );
}
