import './App.css';
import { About } from './components/About';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Projects from "./components/Projects.jsx"

function App() {

  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />

    </div>
  );
}

export default App;
