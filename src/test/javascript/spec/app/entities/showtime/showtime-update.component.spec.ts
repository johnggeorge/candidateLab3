import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MovieDbServiceTestModule } from '../../../test.module';
import { ShowtimeUpdateComponent } from 'app/entities/showtime/showtime-update.component';
import { ShowtimeService } from 'app/entities/showtime/showtime.service';
import { Showtime } from 'app/shared/model/showtime.model';

describe('Component Tests', () => {
  describe('Showtime Management Update Component', () => {
    let comp: ShowtimeUpdateComponent;
    let fixture: ComponentFixture<ShowtimeUpdateComponent>;
    let service: ShowtimeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [ShowtimeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShowtimeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShowtimeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShowtimeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Showtime(123);
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
        const entity = new Showtime();
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
