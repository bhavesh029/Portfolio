import { useEffect } from "react";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return (
    <div className="relative bg-space-900 overflow-hidden">
      <Helmet>
        <title>Bhavesh Chauhan | Senior Software Engineer</title>
        <meta
          name="description"
          content="Senior Software Engineer with 4+ years building cloud-native microservices, event-driven systems, and scalable APIs on AWS."
        />
        <meta
          name="keywords"
          content="Bhavesh Chauhan, Senior Software Engineer, Backend Developer, Node.js, NestJS, AWS, Microservices, Kafka, React, AI"
        />
        <meta name="author" content="Bhavesh Chauhan" />
      </Helmet>

      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none z-0" />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
