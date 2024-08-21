import React, { useState, useEffect } from 'react';
import '../styles/TimeSelect.css';
import Appointment from './models/Appointment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece] | undefined;

interface TimeSelectProps {
    availability: Appointment[];
    date: Value;
    onTimeSelect?: (selectedTime: string) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ availability, date, onTimeSelect }) => {
    const toDate = require('normalize-date');

    const filteredAvailability = availability.filter(appointment =>
        toDate(appointment.date).valueOf() === toDate(date).valueOf()
    );

    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!selectedTime || !filteredAvailability.some(time => time.time === selectedTime)) {
            if (filteredAvailability.length > 0) {
                const initialTime = filteredAvailability[0].time;
                setSelectedTime(initialTime);
                if (onTimeSelect) {
                    onTimeSelect(initialTime);
                }
            } else {
                setSelectedTime(undefined);
                if (onTimeSelect) {
                    onTimeSelect('');
                }
            }
        }
    }, [filteredAvailability, selectedTime, onTimeSelect]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedTime(selected);
        if (onTimeSelect) {
            onTimeSelect(selected);
        }
    };

    return (
        <div>
            <select className="time_select" onChange={handleChange} value={selectedTime}>
                {filteredAvailability.length > 0 ? (
                    filteredAvailability.map(time => (
                        <option className="" key={time.id} value={time.time}>{time.time}</option>
                    ))
                ) : (
                    <option>No available times</option>
                )}
            </select>
        </div>
    );
};

export default TimeSelect;
