import { Moment } from 'moment';
import { IBooking } from 'app/shared/model/booking.model';
import { ITheater } from 'app/shared/model/theater.model';
import { IMovie } from 'app/shared/model/movie.model';

export interface IShowtime {
  id?: number;
  time?: Moment;
  noofseats?: number;
  rate?: number;
  bookings?: IBooking[];
  theater?: ITheater;
  movie?: IMovie;
}

export class Showtime implements IShowtime {
  constructor(
    public id?: number,
    public time?: Moment,
    public noofseats?: number,
    public rate?: number,
    public bookings?: IBooking[],
    public theater?: ITheater,
    public movie?: IMovie
  ) {}
}
