import React, { useEffect, useState } from 'react';
import '../styles/Appointments.css';
import Appointment from './models/Appointment';
import { MdDelete } from "react-icons/md";
import Doctor from './models/Doctor';
import BookAppointmentForm from './BookAppointmentForm';

const Appointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setAppointments(jsonData.appointments);
            setDoctors(jsonData.doctors);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = async (appointmentId: number) => {
        console.log(`Deleting appointment with ID: ${appointmentId}`);
        try {
            const response = await fetch(`http://localhost:5000/api/data/appointments/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Delete successful:', result);

            fetchAppointments();

        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const findDoctorNameById = (doctorId: number) => {
        const doctor = doctors.find(doc => doc.id === doctorId);
        return doctor ? doctor.name : 'Unknown Doctor';
    };

    return (
        <div className="appointments_container">
            <h2>Appointments</h2>
            <div className="appointments_section">
                <ul>
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <li className="appointment" key={appointment.id}>
                                <div className="appointment_doctor">{findDoctorNameById(appointment.doctorId)}</div>
                                <div className="appointment_date">{appointment.date.toString()}</div>
                                <div className="appointment_time">{appointment.time}</div>
                                <button className="delete_button" onClick={() => handleDelete(appointment.id)}>
                                    <MdDelete className="delete_icon" />
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>No appointments found</li>
                    )}
                </ul>
            </div>

            <BookAppointmentForm onAppointmentAdded={fetchAppointments} />
        </div>
    );
};

export default Appointments;
