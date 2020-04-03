import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShowtime } from 'app/shared/model/showtime.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ShowtimeService } from './showtime.service';
import { ShowtimeDeleteDialogComponent } from './showtime-delete-dialog.component';

@Component({
  selector: 'jhi-showtime',
  templateUrl: './showtime.component.html'
})
export class ShowtimeComponent implements OnInit, OnDestroy {
  showtimes: IShowtime[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected showtimeService: ShowtimeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.showtimes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.showtimeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IShowtime[]>) => this.paginateShowtimes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.showtimes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShowtimes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShowtime): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShowtimes(): void {
    this.eventSubscriber = this.eventManager.subscribe('showtimeListModification', () => this.reset());
  }

  delete(showtime: IShowtime): void {
    const modalRef = this.modalService.open(ShowtimeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.showtime = showtime;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateShowtimes(data: IShowtime[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.showtimes.push(data[i]);
      }
    }
  }
}
