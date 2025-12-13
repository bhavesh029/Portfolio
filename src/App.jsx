import { useEffect } from "react";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import TechStack from "./components/TechStack";
import About from "./components/about";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  // Initialize Google Analytics
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return (
    <div className="relative z-0 bg-white">
      {/* SEO Configuration */}
      <Helmet>
        <title>Bhavesh Chauhan | Full-Stack Cloud Engineer</title>
        <meta
          name="description"
          content="Freelance Software Engineer specializing in scalable Backend (Node.js/NestJS), AWS Cloud Architecture, and AI-Powered Automations."
        />
        <meta
          name="keywords"
          content="Bhavesh Chauhan, Backend Developer, Freelancer, Node.js, AWS, React, AI Automation"
        />
        <meta name="author" content="Bhavesh Chauhan" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bhaveshchauhan.me/" />
        <meta
          property="og:title"
          content="Bhavesh Chauhan - Full-Stack Cloud Engineer"
        />
        <meta
          property="og:description"
          content="Building scalable backend systems and AI automations for forward-thinking businesses."
        />
        {/* Note: Ensure this image path works in production or use a full URL */}
        <meta
          property="og:image"
          content="https://bhaveshchauhan.me/assets/images/your-photo.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bhaveshchauhan.me/" />
        <meta
          property="twitter:title"
          content="Bhavesh Chauhan - Full-Stack Cloud Engineer"
        />
        <meta
          property="twitter:description"
          content="Building scalable backend systems and AI automations for forward-thinking businesses."
        />
        <meta
          property="twitter:image"
          content="https://bhaveshchauhan.me/assets/images/your-photo.jpg"
        />
      </Helmet>

      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <TechStack />
      <About />
      <div className="relative z-0">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default App;
