import React, { useEffect, useState } from 'react';
import '../styles/DoctorSelector.css';
import Doctor from './models/Doctor';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Appointment from './models/Appointment';
import { format } from 'date-fns';
import TimeSelect from './TimeSelect';
import DoctorSelector from './DoctorSelector';

interface DoctorSelectorProps { }

const BookAppointmentForm: React.FC<DoctorSelectorProps> = () => {
    const [showDoctorSelector, setShowDoctorSelector] = useState(false);
    const [data, setData] = useState<Doctor[]>([]);
    const [availability, setAvailability] = useState<Appointment[]>([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [selectedDoctorId, setSelectedDoctorId] = useState<number>();

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece] | undefined;
    const [value, onChange] = useState<Value>();

    const handleDoctorClick = () => {
        setShowDoctorSelector(true);
    }

    const handleCloseDoctorSelector = () => {
        setShowDoctorSelector(false);
    };

    const handleShowCalendar = async (id: number) => {
        setSelectedDoctorId(id);
        try {
            const response = await fetch(`http://localhost:5000/api/data/availability/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setAvailability(jsonData.availability);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setShowCalendar(true);
    }

    const handleCloseCalendar = () => {
        setShowCalendar(false);
        setSelectedTime(undefined);
        onChange(undefined);
    }

    const handleCalendarClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

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

    const tileDisabled = ({ date }: { date: Date }) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        return !availability.some(appt => format(appt.date, 'yyyy-MM-dd') === formattedDate);
    };

    const tileClassName = ({ date }: { date: Date }) => {
        const today = new Date();
        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();

        return isToday ? 'today' : null;
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const isButtonDisabled = !selectedDoctorId || !value || !selectedTime;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedDoctorId || !value || !selectedTime) {
            console.error("Doctor, Date or Time not selected");
            return;
        }

        const formattedDate = format(value as Date, 'yyyy-MM-dd');
        const appointmentData = {
            doctorId: selectedDoctorId,
            date: formattedDate,
            time: selectedTime
        };

        try {
            const response = await fetch('http://localhost:5000/api/data/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                console.log("Appointment booked successfully");
            } else {
                console.error('Error booking the appointment');
            }
        } catch (error) {
            console.error('Error sending the data:', error);
        }

        setShowCalendar(false);
        setSelectedTime(undefined);
        onChange(undefined);
    };

    return (
        <div className="doctor_selector_container">
            <form onSubmit={handleSubmit}>
                <button type="button" className="button_with_background" onClick={handleDoctorClick}>Book</button>
                {showDoctorSelector &&
                    <DoctorSelector
                        doctors={data}
                        onSelectDoctor={handleShowCalendar}
                        onClose={handleCloseDoctorSelector}
                    />
                }

                {showCalendar &&
                    <div className="date_selector" onClick={handleCloseCalendar}>
                        <div className="calendar_container" onClick={handleCalendarClick}>
                            <Calendar
                                className="calendar_popup"
                                tileClassName={tileClassName}
                                tileDisabled={tileDisabled}
                                onChange={onChange}
                                value={value}
                            />
                            <TimeSelect
                                date={value}
                                availability={availability}
                                onTimeSelect={handleTimeSelect}
                            />
                            <button type="submit" className="confirm_reservation_button" disabled={isButtonDisabled}>Confirm Reservation</button>
                        </div>
                    </div>
                }
            </form>
        </div>
    );
};

export default BookAppointmentForm;
