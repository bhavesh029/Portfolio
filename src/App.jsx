import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="relative z-0 bg-white">
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
