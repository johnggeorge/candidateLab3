import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MovieDbServiceTestModule } from '../../../test.module';
import { TheaterDetailComponent } from 'app/entities/theater/theater-detail.component';
import { Theater } from 'app/shared/model/theater.model';

describe('Component Tests', () => {
  describe('Theater Management Detail Component', () => {
    let comp: TheaterDetailComponent;
    let fixture: ComponentFixture<TheaterDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ theater: new Theater(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MovieDbServiceTestModule],
        declarations: [TheaterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TheaterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TheaterDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load theater on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.theater).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
