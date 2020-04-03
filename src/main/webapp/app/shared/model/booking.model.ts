import { ICustomer } from 'app/shared/model/customer.model';
import { IShowtime } from 'app/shared/model/showtime.model';

export interface IBooking {
  id?: number;
  noOfSeats?: number;
  user?: ICustomer;
  showtime?: IShowtime;
}

export class Booking implements IBooking {
  constructor(public id?: number, public noOfSeats?: number, public user?: ICustomer, public showtime?: IShowtime) {}
}
