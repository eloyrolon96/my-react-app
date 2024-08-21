import React from 'react';
import '../styles/DoctorSelector.css';
import Doctor from './models/Doctor';

interface DoctorSelectorProps {
    doctors: Doctor[];
    onSelectDoctor: (id: number) => void;
    onClose: () => void;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({ doctors, onSelectDoctor, onClose }) => {
    return (
        <div className="doctor_selector" onClick={onClose}>
            <ul className="doctors_list">
                <h2>Select Doctor</h2>
                {doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <li key={doctor.id}>
                            <button className="doctor_button" onClick={() => onSelectDoctor(doctor.id)}>{doctor.name}</button>
                        </li>
                    ))
                ) : (
                    <li>No doctors found</li>
                )}
            </ul>
        </div>
    );
};

export default DoctorSelector;
