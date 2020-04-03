import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITheater } from 'app/shared/model/theater.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TheaterService } from './theater.service';
import { TheaterDeleteDialogComponent } from './theater-delete-dialog.component';

@Component({
  selector: 'jhi-theater',
  templateUrl: './theater.component.html'
})
export class TheaterComponent implements OnInit, OnDestroy {
  theaters: ITheater[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected theaterService: TheaterService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.theaters = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.theaterService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITheater[]>) => this.paginateTheaters(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.theaters = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTheaters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITheater): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInTheaters(): void {
    this.eventSubscriber = this.eventManager.subscribe('theaterListModification', () => this.reset());
  }

  delete(theater: ITheater): void {
    const modalRef = this.modalService.open(TheaterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.theater = theater;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTheaters(data: ITheater[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.theaters.push(data[i]);
      }
    }
  }
}
