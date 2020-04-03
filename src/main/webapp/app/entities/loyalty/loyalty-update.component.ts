import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILoyalty, Loyalty } from 'app/shared/model/loyalty.model';
import { LoyaltyService } from './loyalty.service';

@Component({
  selector: 'jhi-loyalty-update',
  templateUrl: './loyalty-update.component.html'
})
export class LoyaltyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    type: []
  });

  constructor(protected loyaltyService: LoyaltyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loyalty }) => {
      this.updateForm(loyalty);
    });
  }

  updateForm(loyalty: ILoyalty): void {
    this.editForm.patchValue({
      id: loyalty.id,
      type: loyalty.type
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const loyalty = this.createFromForm();
    if (loyalty.id !== undefined) {
      this.subscribeToSaveResponse(this.loyaltyService.update(loyalty));
    } else {
      this.subscribeToSaveResponse(this.loyaltyService.create(loyalty));
    }
  }

  private createFromForm(): ILoyalty {
    return {
      ...new Loyalty(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoyalty>>): void {
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
