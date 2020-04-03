import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IShowtime, Showtime } from 'app/shared/model/showtime.model';
import { ShowtimeService } from './showtime.service';
import { ITheater } from 'app/shared/model/theater.model';
import { TheaterService } from 'app/entities/theater/theater.service';
import { IMovie } from 'app/shared/model/movie.model';
import { MovieService } from 'app/entities/movie/movie.service';

type SelectableEntity = ITheater | IMovie;

@Component({
  selector: 'jhi-showtime-update',
  templateUrl: './showtime-update.component.html'
})
export class ShowtimeUpdateComponent implements OnInit {
  isSaving = false;
  theaters: ITheater[] = [];
  movies: IMovie[] = [];

  editForm = this.fb.group({
    id: [],
    time: [],
    noofseats: [],
    rate: [],
    theater: [],
    movie: []
  });

  constructor(
    protected showtimeService: ShowtimeService,
    protected theaterService: TheaterService,
    protected movieService: MovieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ showtime }) => {
      if (!showtime.id) {
        const today = moment().startOf('day');
        showtime.time = today;
      }

      this.updateForm(showtime);

      this.theaterService.query().subscribe((res: HttpResponse<ITheater[]>) => (this.theaters = res.body || []));

      this.movieService.query().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));
    });
  }

  updateForm(showtime: IShowtime): void {
    this.editForm.patchValue({
      id: showtime.id,
      time: showtime.time ? showtime.time.format(DATE_TIME_FORMAT) : null,
      noofseats: showtime.noofseats,
      rate: showtime.rate,
      theater: showtime.theater,
      movie: showtime.movie
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const showtime = this.createFromForm();
    if (showtime.id !== undefined) {
      this.subscribeToSaveResponse(this.showtimeService.update(showtime));
    } else {
      this.subscribeToSaveResponse(this.showtimeService.create(showtime));
    }
  }

  private createFromForm(): IShowtime {
    return {
      ...new Showtime(),
      id: this.editForm.get(['id'])!.value,
      time: this.editForm.get(['time'])!.value ? moment(this.editForm.get(['time'])!.value, DATE_TIME_FORMAT) : undefined,
      noofseats: this.editForm.get(['noofseats'])!.value,
      rate: this.editForm.get(['rate'])!.value,
      theater: this.editForm.get(['theater'])!.value,
      movie: this.editForm.get(['movie'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShowtime>>): void {
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
