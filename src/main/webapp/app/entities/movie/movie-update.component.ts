import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IMovie, Movie } from 'app/shared/model/movie.model';
import { MovieService } from './movie.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-movie-update',
  templateUrl: './movie-update.component.html'
})
export class MovieUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    rating: [],
    genre: [],
    cast: [],
    image: [],
    imageContentType: [],
    desc: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected movieService: MovieService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movie }) => {
      this.updateForm(movie);
    });
  }

  updateForm(movie: IMovie): void {
    this.editForm.patchValue({
      id: movie.id,
      name: movie.name,
      rating: movie.rating,
      genre: movie.genre,
      cast: movie.cast,
      image: movie.image,
      imageContentType: movie.imageContentType,
      desc: movie.desc
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
    const movie = this.createFromForm();
    if (movie.id !== undefined) {
      this.subscribeToSaveResponse(this.movieService.update(movie));
    } else {
      this.subscribeToSaveResponse(this.movieService.create(movie));
    }
  }

  private createFromForm(): IMovie {
    return {
      ...new Movie(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      rating: this.editForm.get(['rating'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      cast: this.editForm.get(['cast'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      desc: this.editForm.get(['desc'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovie>>): void {
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
}
