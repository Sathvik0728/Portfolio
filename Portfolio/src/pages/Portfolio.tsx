import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Certificates from '../components/Certificates'
import Contact from '../components/Contact'
import BackToTop from '../components/BackToTop'
import SectionDivider from '../components/SectionDivider'

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Certificates />
      <SectionDivider />
      <Contact />
      <BackToTop />
    </>
  )
}
