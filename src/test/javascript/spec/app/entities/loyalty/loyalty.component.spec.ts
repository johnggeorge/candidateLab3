import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MovieDbServiceTestModule } from '../../../test.module';
import { LoyaltyComponent } from 'app/entities/loyalty/loyalty.component';
import { LoyaltyService } from 'app/entities/loyalty/loyalty.service';
import { Loyalty } from 'app/shared/model/loyalty.model';

describe('Component Tests', () => {
  describe('Loyalty Management Component', () => {
    let comp: LoyaltyComponent;
    let fixture: ComponentFixture<LoyaltyComponent>;
    let service: LoyaltyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [LoyaltyComponent]
      })
        .overrideTemplate(LoyaltyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoyaltyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoyaltyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Loyalty(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.loyalties && comp.loyalties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
