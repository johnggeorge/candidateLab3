import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoyalty } from 'app/shared/model/loyalty.model';

@Component({
  selector: 'jhi-loyalty-detail',
  templateUrl: './loyalty-detail.component.html'
})
export class LoyaltyDetailComponent implements OnInit {
  loyalty: ILoyalty | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loyalty }) => (this.loyalty = loyalty));
  }

  previousState(): void {
    window.history.back();
  }
}
