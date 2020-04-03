import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBooking, Booking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IShowtime } from 'app/shared/model/showtime.model';
import { ShowtimeService } from 'app/entities/showtime/showtime.service';

type SelectableEntity = ICustomer | IShowtime;

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];
  showtimes: IShowtime[] = [];

  editForm = this.fb.group({
    id: [],
    noOfSeats: [],
    user: [],
    showtime: []
  });

  constructor(
    protected bookingService: BookingService,
    protected customerService: CustomerService,
    protected showtimeService: ShowtimeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      this.updateForm(booking);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.showtimeService.query().subscribe((res: HttpResponse<IShowtime[]>) => (this.showtimes = res.body || []));
    });
  }

  updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      noOfSeats: booking.noOfSeats,
      user: booking.user,
      showtime: booking.showtime
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const booking = this.createFromForm();
    if (booking.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingService.update(booking));
    } else {
      this.subscribeToSaveResponse(this.bookingService.create(booking));
    }
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: this.editForm.get(['id'])!.value,
      noOfSeats: this.editForm.get(['noOfSeats'])!.value,
      user: this.editForm.get(['user'])!.value,
      showtime: this.editForm.get(['showtime'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
