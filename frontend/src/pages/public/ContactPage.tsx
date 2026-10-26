
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The backend enquiry endpoint will be connected in a later step.
    window.alert(
      "The contact form is ready for the next integration step. Your message has not been sent."
    );
  }

  return (
    <main className="content-page">
      <section>
        <p className="eyebrow">We'd Love to Hear From You</p>
        <h1>Contact Koothambalam</h1>
        <p>
          Interested in learning Indian classical dance? Send us an enquiry
          and take the first step in your dance journey.
        </p>
      </section>

      <section>
        <h2>Send an Enquiry</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              required
            />
          </div>

          <button type="submit">Send Enquiry</button>
        </form>

        <p>
          This form is currently a frontend prototype. It will not send
          or save enquiries until the backend is connected.
        </p>
      </section>
    </main>
  );
}
