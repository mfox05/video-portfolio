import { LangProvider } from './i18n/LangContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ViralCase from './sections/ViralCase';
import BusinessCase from './sections/BusinessCase';
import Work from './sections/Work';
import Contact from './sections/Contact';

function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <main>
          <Hero />
          <ViralCase />
          <BusinessCase />
          <Work />
          <Contact />
        </main>
      </div>
    </LangProvider>
  );
}

export default App;
