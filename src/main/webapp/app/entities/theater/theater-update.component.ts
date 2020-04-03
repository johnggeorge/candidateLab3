import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ITheater, Theater } from 'app/shared/model/theater.model';
import { TheaterService } from './theater.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IMovie } from 'app/shared/model/movie.model';
import { MovieService } from 'app/entities/movie/movie.service';

@Component({
  selector: 'jhi-theater-update',
  templateUrl: './theater-update.component.html'
})
export class TheaterUpdateComponent implements OnInit {
  isSaving = false;
  movies: IMovie[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    address: [],
    image: [],
    imageContentType: [],
    movies: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected theaterService: TheaterService,
    protected movieService: MovieService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ theater }) => {
      this.updateForm(theater);

      this.movieService.query().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));
    });
  }

  updateForm(theater: ITheater): void {
    this.editForm.patchValue({
      id: theater.id,
      name: theater.name,
      address: theater.address,
      image: theater.image,
      imageContentType: theater.imageContentType,
      movies: theater.movies
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('movieDbServiceApp.error', { message: err.message })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const theater = this.createFromForm();
    if (theater.id !== undefined) {
      this.subscribeToSaveResponse(this.theaterService.update(theater));
    } else {
      this.subscribeToSaveResponse(this.theaterService.create(theater));
    }
  }

  private createFromForm(): ITheater {
    return {
      ...new Theater(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      movies: this.editForm.get(['movies'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITheater>>): void {
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

  trackById(index: number, item: IMovie): any {
    return item.id;
  }

  getSelected(selectedVals: IMovie[], option: IMovie): IMovie {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
