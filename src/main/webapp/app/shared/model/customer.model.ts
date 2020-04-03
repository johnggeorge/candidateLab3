import { IBooking } from 'app/shared/model/booking.model';
import { ILoyalty } from 'app/shared/model/loyalty.model';

export interface ICustomer {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  bookings?: IBooking[];
  loyalty?: ILoyalty;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public password?: string,
    public bookings?: IBooking[],
    public loyalty?: ILoyalty
  ) {}
}
