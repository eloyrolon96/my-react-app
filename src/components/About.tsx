import '../styles/About.css';

const About = () => {
    return (
        <div className="about_container">

            <h2 className="about_title">About Doctor.app</h2>

            <div className="about_section">              
                <h3 className="about_section_title">Our Mission</h3>
                <p>At Doctor.app, we believe that health is the most important asset. Our mission is to make access to healthcare simpler and more accessible for everyone. We aim to connect patients with top healthcare professionals quickly and efficiently.</p>
            </div>

            <div className="about_section">
                <h3 className="about_section_title">What We Offer</h3>
                <ul>
                    <li>Access to a Wide Network of Professionals: Find doctors across various specialties in your area or consult online from the comfort of your home.</li>
                    <li>Easy and Fast Booking: Schedule your medical appointments in a few simple steps, choosing the time that best fits your schedule.</li>
                    <li>Reviews and Ratings: Read reviews and ratings from other patients to select the doctor that best suits your needs.</li>
                    <li>Appointment Reminders: Receive notifications so you never forget your medical appointments.</li>
                </ul>
            </div>

            <div className="about_section">
                <h3 className="about_section_title">Our story</h3>
                <p>Founded in 2024, Doctor.app was created with the goal of innovating in the digital healthcare sector. Since then, we have grown into a trusted platform for thousands of users, continuously improving to provide high-quality service.</p>
            </div>

            <div className="about_section">
                <h3 className="about_section_title">Our Commitment to Privacy</h3>
                <p>We take your privacy and data security very seriously. We comply with all regulations and standards to protect your personal and medical information.</p>
            </div>

        </div>       

    );
}

export default About;