import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MovieDbServiceTestModule } from '../../../test.module';
import { LoyaltyUpdateComponent } from 'app/entities/loyalty/loyalty-update.component';
import { LoyaltyService } from 'app/entities/loyalty/loyalty.service';
import { Loyalty } from 'app/shared/model/loyalty.model';

describe('Component Tests', () => {
  describe('Loyalty Management Update Component', () => {
    let comp: LoyaltyUpdateComponent;
    let fixture: ComponentFixture<LoyaltyUpdateComponent>;
    let service: LoyaltyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [LoyaltyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LoyaltyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoyaltyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoyaltyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Loyalty(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Loyalty();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
