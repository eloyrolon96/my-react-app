import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/BookingCalendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingCalendarProps {
    buttonText?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ buttonText }) => {

    const [value, onChange] = useState<Value>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleButtonClick = () => {
        setShowCalendar(true);
    }
    const handleCloseCalendar = () => {
        setShowCalendar(false);
    };

    return (
        <div className="calendar_container">
            <div className="button_container">
                <button className="button_with_background" onClick={handleButtonClick}>{buttonText}</button>
            </div>
            {showCalendar && <div className="overlay" onClick={handleCloseCalendar}></div>}
            {showCalendar && (

                <Calendar className="calendar_popup" onChange={onChange} value={value} />

            )}

        </div>
    );

};

export default BookingCalendar;