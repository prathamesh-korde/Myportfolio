import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'

// Root application with single-page scroll layout
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <ScrollProgress />
      <Navbar />
      <main>
        <section id="home" className="scroll-section">
          <Home />
        </section>
        <section id="about" className="scroll-section">
          <About />
        </section>
        <section id="projects" className="scroll-section">
          <Projects />
        </section>
        <section id="experience" className="scroll-section">
          <Experience />
        </section>
        <section id="contact" className="scroll-section">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
