import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieDbServiceSharedModule } from 'app/shared/shared.module';
import { TheaterComponent } from './theater.component';
import { TheaterDetailComponent } from './theater-detail.component';
import { TheaterUpdateComponent } from './theater-update.component';
import { TheaterDeleteDialogComponent } from './theater-delete-dialog.component';
import { theaterRoute } from './theater.route';

@NgModule({
  imports: [MovieDbServiceSharedModule, RouterModule.forChild(theaterRoute)],
  declarations: [TheaterComponent, TheaterDetailComponent, TheaterUpdateComponent, TheaterDeleteDialogComponent],
  entryComponents: [TheaterDeleteDialogComponent]
})
export class MovieDbServiceTheaterModule {}
