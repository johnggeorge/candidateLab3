import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieDbServiceSharedModule } from 'app/shared/shared.module';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltyDetailComponent } from './loyalty-detail.component';
import { LoyaltyUpdateComponent } from './loyalty-update.component';
import { LoyaltyDeleteDialogComponent } from './loyalty-delete-dialog.component';
import { loyaltyRoute } from './loyalty.route';

@NgModule({
  imports: [MovieDbServiceSharedModule, RouterModule.forChild(loyaltyRoute)],
  declarations: [LoyaltyComponent, LoyaltyDetailComponent, LoyaltyUpdateComponent, LoyaltyDeleteDialogComponent],
  entryComponents: [LoyaltyDeleteDialogComponent]
})
export class MovieDbServiceLoyaltyModule {}
