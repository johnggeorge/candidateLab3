import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovieDbServiceTestModule } from '../../../test.module';
import { LoyaltyDetailComponent } from 'app/entities/loyalty/loyalty-detail.component';
import { Loyalty } from 'app/shared/model/loyalty.model';

describe('Component Tests', () => {
  describe('Loyalty Management Detail Component', () => {
    let comp: LoyaltyDetailComponent;
    let fixture: ComponentFixture<LoyaltyDetailComponent>;
    const route = ({ data: of({ loyalty: new Loyalty(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [LoyaltyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LoyaltyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoyaltyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load loyalty on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.loyalty).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
