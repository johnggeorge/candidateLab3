import { IBooking } from 'app/shared/model/booking.model';
import { Loyalty } from 'app/shared/model/enumerations/loyalty.model';

export interface ICustomer {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  loyalty?: Loyalty;
  bookings?: IBooking[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public password?: string,
    public loyalty?: Loyalty,
    public bookings?: IBooking[]
  ) {}
}
