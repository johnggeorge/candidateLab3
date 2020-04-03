import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovieDbServiceTestModule } from '../../../test.module';
import { ShowtimeDetailComponent } from 'app/entities/showtime/showtime-detail.component';
import { Showtime } from 'app/shared/model/showtime.model';

describe('Component Tests', () => {
  describe('Showtime Management Detail Component', () => {
    let comp: ShowtimeDetailComponent;
    let fixture: ComponentFixture<ShowtimeDetailComponent>;
    const route = ({ data: of({ showtime: new Showtime(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [ShowtimeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShowtimeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShowtimeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load showtime on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.showtime).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
