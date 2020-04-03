import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILoyalty } from 'app/shared/model/loyalty.model';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyDeleteDialogComponent } from './loyalty-delete-dialog.component';

@Component({
  selector: 'jhi-loyalty',
  templateUrl: './loyalty.component.html'
})
export class LoyaltyComponent implements OnInit, OnDestroy {
  loyalties?: ILoyalty[];
  eventSubscriber?: Subscription;

  constructor(protected loyaltyService: LoyaltyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.loyaltyService.query().subscribe((res: HttpResponse<ILoyalty[]>) => (this.loyalties = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLoyalties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILoyalty): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLoyalties(): void {
    this.eventSubscriber = this.eventManager.subscribe('loyaltyListModification', () => this.loadAll());
  }

  delete(loyalty: ILoyalty): void {
    const modalRef = this.modalService.open(LoyaltyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.loyalty = loyalty;
  }
}
