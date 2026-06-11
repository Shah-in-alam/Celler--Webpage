import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import WineSelection from './components/WineSelection.jsx'
import Shop from './components/Shop.jsx'
import Events from './components/Events.jsx'
import Reviews from './components/Reviews.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <WineSelection />
        <Shop />
        <Events />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
