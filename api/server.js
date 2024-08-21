const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});

app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/data/availability/:doctorId', (req, res) => {
    const doctorId = parseInt(req.params.doctorId, 10);

    if (isNaN(doctorId)) {
        return res.status(400).json({ error: 'Invalid doctorId' });
    }

    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }

        try {
            const jsonData = JSON.parse(data);
            const availability = jsonData.availability || [];
            const filteredData = availability.filter(item => item.doctorId === doctorId);

            if (filteredData.length === 0) {
                return res.status(200).json({ availability: [] });
            }

            res.json({ availability: filteredData });
        } catch (parseError) {
            res.status(500).send('Error parsing JSON data');
        }
    });
});


app.delete('/api/data/appointments/:id', (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send('Error parsing JSON data');
        }

        const appointments = jsonData.appointments || [];
        const availability = jsonData.availability || [];

        const index = appointments.findIndex(app => app.id === appointmentId);

        if (index !== -1) {
            const deletedAppointment = appointments[index];
            const { doctorId, date, time } = deletedAppointment;

            appointments.splice(index, 1);

            const newAvailability = {
                id: appointments.length + 1,
                doctorId: doctorId,
                date: date,
                time: time,
            };

            availability.push(newAvailability);

            jsonData.appointments = appointments;
            jsonData.availability = availability;

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    res.status(500).send('Error updating the file');
                    return;
                }
                res.status(200).json({ message: 'Appointment deleted and availability restored successfully' });
            });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    });
});


app.post('/api/data/appointments', (req, res) => {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
        return res.status(400).json({ error: 'Doctor, Date, and Time are required' });
    }

    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send('Error parsing JSON data');
        }

        const appointments = jsonData.appointments || [];
        const availability = jsonData.availability || [];

        const newAppointment = {
            id: appointments.length + 1,
            doctorId: doctorId,
            patientId: 999,
            date: date,
            time: time,
        };

        appointments.push(newAppointment);

        const updatedAvailability = availability.filter(avail => {
            return !(avail.doctorId === doctorId && avail.date === date && avail.time === time);
        });

        jsonData.appointments = appointments;
        jsonData.availability = updatedAvailability;

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).send('Error writing the file');
            }

            return res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
        });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});