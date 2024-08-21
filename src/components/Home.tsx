import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home_container">

            <h2>Welcome to Doctor.app</h2>
            <p>Use the app to book an appointment with your doctor.</p>

            <div className="responsive_section">

                <div className="image_paragraph">
                    <img src="https://cdn.euroinnova.edu.es/img/subidasEditor/doctor-5871743_640-1610073541.webp" alt="image_description" />
                    <div className="text_content">
                        <h3>Find Top Doctors Without Leaving Home</h3>
                        <p> Discover top-rated doctors from the comfort of your own home. Our platform connects you with leading medical professionals who are ready
                            to provide expert advice and personalized care without you ever needing to step outside.
                            Enjoy seamless virtual consultations that save you time, eliminate travel hassles,
                            and offer high-quality healthcare at your convenience. Whether you need a routine check-up or a specialized consultation,
                            finding the right doctor has never been easier.
                        </p>
                    </div>
                </div>

                <div className="image_paragraph">
                    <img src="https://isabellephilipp.dk/wp-content/smush-webp/2023/12/Aarhusvej-49.jpg.webp" alt="image_description" />
                    <div className="text_content">
                        <h3>Welcome to Our Modern Medical Facility</h3>
                        <p> Where cutting-edge technology meets compassionate care. Our state-of-the-art clinic is designed with your comfort and health in mind,
                            featuring the latest medical equipment and a welcoming environment.
                            From the moment you step through our doors, you will experience a commitment to excellence and personalized attention.
                            Our dedicated team of healthcare professionals is here to ensure that every aspect of your visit is smooth and effective,
                            providing you with top-tier medical care in a setting that feels both advanced and reassuring. Discover how we blend innovation
                            with a patient-centered approach to deliver the highest standard of medical care.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;