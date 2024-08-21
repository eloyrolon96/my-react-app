class Appointment {

    id: number;
    doctorId: number;
    patientId: number;
    date: Date;
    time: string;

    constructor(id: number, doctorId: number, patientId: number, date: Date, time: string) {

        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.date = date;
        this.time = time;
    }

    delete(id:number): boolean {
        return true;
    }

}

export default Appointment;