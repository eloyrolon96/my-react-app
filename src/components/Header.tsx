import React from 'react';
import '../styles/Header.css';

type Section = 'home' | 'about' | 'contact' | 'doctors' | 'appointments';
type HeaderProps = {
    setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
};

const Header: React.FC<HeaderProps> = ({ setActiveSection }) => {

    return (

        <header className="header">
            <h1>Doctor.app</h1>
            <nav className="navigation">
                <ul>
                    <li><a href="#home" onClick={() => setActiveSection('home')}>Home</a></li>
                    <li><a href="#about" onClick={() => setActiveSection('about')}>About</a></li>
                   
                    <li><a href="#doctors" onClick={() => setActiveSection('doctors')}>Doctors</a></li>
                    <li><a href="#appointments" onClick={() => setActiveSection('appointments')}>Appointments</a></li>
                </ul>
            </nav>            
        </header>
    );
}

export default Header;