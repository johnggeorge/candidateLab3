import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShowtime } from 'app/shared/model/showtime.model';
import { ShowtimeService } from './showtime.service';

@Component({
  templateUrl: './showtime-delete-dialog.component.html'
})
export class ShowtimeDeleteDialogComponent {
  showtime?: IShowtime;

  constructor(protected showtimeService: ShowtimeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.showtimeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('showtimeListModification');
      this.activeModal.close();
    });
  }
}
