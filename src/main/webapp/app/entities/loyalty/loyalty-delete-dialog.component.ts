import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoyalty } from 'app/shared/model/loyalty.model';
import { LoyaltyService } from './loyalty.service';

@Component({
  templateUrl: './loyalty-delete-dialog.component.html'
})
export class LoyaltyDeleteDialogComponent {
  loyalty?: ILoyalty;

  constructor(protected loyaltyService: LoyaltyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.loyaltyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('loyaltyListModification');
      this.activeModal.close();
    });
  }
}
