import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Background from './components/Background';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';

type Section = 'home' | 'about' | 'contact' | 'doctors' | 'appointments';

function App() {

    const [activeSection, setActiveSection] = useState<Section>('home');

    const renderSection = () => {
        switch (activeSection) {
            case 'home':
                return <Home />;
            case 'about':
                return <About />;
            case 'contact':
                return <Contact />;
            case 'doctors':
                return <Doctors />;
            case 'appointments':
                return <Appointments />;
            default:
                return <Home />;
        }
    };

  return (
      <div className="App">
          <Header setActiveSection={setActiveSection} />         
          <Background></Background>
          <div className="body_app">
              {renderSection()}  
          </div>
      </div>
  );
}

export default App;