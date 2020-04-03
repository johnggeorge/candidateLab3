import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITheater } from 'app/shared/model/theater.model';
import { TheaterService } from './theater.service';

@Component({
  templateUrl: './theater-delete-dialog.component.html'
})
export class TheaterDeleteDialogComponent {
  theater?: ITheater;

  constructor(protected theaterService: TheaterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.theaterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('theaterListModification');
      this.activeModal.close();
    });
  }
}
