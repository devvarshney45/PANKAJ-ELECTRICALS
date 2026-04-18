import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import HeroSlider from "../components/HeroSlider";
import CompanySection from "../components/CompanySection";
import Services from "../components/Services";
import Projects from "../components/Projects";
import About from "../components/About";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen selection:bg-amber-500/30">
      <Navbar />
      
      <main>
        <HeroSlider />
        
        <div className="space-y-32 py-20">
          <section id="about" data-aos="fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <CompanySection />
            </div>
          </section>

          <Services />

          <section id="projects" data-aos="fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <Projects />
            </div>
          </section>

          <section id="contact" data-aos="fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <About />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}