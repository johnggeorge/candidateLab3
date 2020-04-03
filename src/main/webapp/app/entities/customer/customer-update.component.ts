import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomer, Customer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { ILoyalty } from 'app/shared/model/loyalty.model';
import { LoyaltyService } from 'app/entities/loyalty/loyalty.service';

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  loyalties: ILoyalty[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    password: [],
    loyalty: []
  });

  constructor(
    protected customerService: CustomerService,
    protected loyaltyService: LoyaltyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

      this.loyaltyService.query().subscribe((res: HttpResponse<ILoyalty[]>) => (this.loyalties = res.body || []));
    });
  }

  updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      loyalty: customer.loyalty
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      loyalty: this.editForm.get(['loyalty'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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

  trackById(index: number, item: ILoyalty): any {
    return item.id;
  }
}
