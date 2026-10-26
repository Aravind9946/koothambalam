
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import WhatWeOfferPage from "../pages/public/WhatWeOfferPage";
import GalleryPage from "../pages/public/GalleryPage";
import EventsPage from "../pages/public/EventsPage";
import ContactPage from "../pages/public/ContactPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/what-we-offer" element={<WhatWeOfferPage />} />
  <Route path="/gallery" element={<GalleryPage />} />
  <Route path="/events" element={<EventsPage />} />
  <Route path="/contact" element={<ContactPage />} />
</Route>

<Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
