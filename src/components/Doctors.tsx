import React, { useEffect, useState } from 'react';
import '../styles/Doctors.css';
import Doctor from './models/Doctor';

const DoctorsList = () => {

    const [data, setData] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData.doctors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    for (let i: number = 0; i < data.length; i++) {
        data[i].picture_alt = "picture" + data[i].id;
    }

    return (
        <div className="doctorsList_container">
            <h2>Doctors</h2>
            <div className="doctor_section">
                <ul>
                    {data.length > 0 ? (
                        data.map(doctor => (
                            <li className="doctor" key={doctor.id}>
                                <img className="doctor_picture" src={doctor.picture_url} alt={doctor.picture_alt}></img>
                                <div className="doctor_details">
                                    <span>{doctor.name}</span>
                                    <span>{doctor.email}</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No doctors found</li>
                    )}
                </ul>
            </div>
        </div>
    );

}

export default DoctorsList;