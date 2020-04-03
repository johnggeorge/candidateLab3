import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShowtime } from 'app/shared/model/showtime.model';

@Component({
  selector: 'jhi-showtime-detail',
  templateUrl: './showtime-detail.component.html'
})
export class ShowtimeDetailComponent implements OnInit {
  showtime: IShowtime | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ showtime }) => (this.showtime = showtime));
  }

  previousState(): void {
    window.history.back();
  }
}
