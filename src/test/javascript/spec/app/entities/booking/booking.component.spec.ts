import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MovieDbServiceTestModule } from '../../../test.module';
import { BookingComponent } from 'app/entities/booking/booking.component';
import { BookingService } from 'app/entities/booking/booking.service';
import { Booking } from 'app/shared/model/booking.model';

describe('Component Tests', () => {
  describe('Booking Management Component', () => {
    let comp: BookingComponent;
    let fixture: ComponentFixture<BookingComponent>;
    let service: BookingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [BookingComponent]
      })
        .overrideTemplate(BookingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Booking(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bookings && comp.bookings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
