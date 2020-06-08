import { Main } from './main.model';


export interface ReservationType {
    ReservationId: number
    SeatId: number
    UserId: number
    StartDate: string
    EndDate: string
}

export class Reservation extends Main implements ReservationType {
    public ReservationId: number
    public SeatId: number
    public UserId: number
    public StartDate: string
    public EndDate: string

    constructor(reservation: ReservationType) {
        super(reservation);
        this.ReservationId = reservation.ReservationId;
        this.SeatId = reservation.SeatId;
        this.UserId = reservation.UserId;
        this.StartDate = reservation.StartDate;
        this.EndDate = reservation.EndDate;
    

    }
}