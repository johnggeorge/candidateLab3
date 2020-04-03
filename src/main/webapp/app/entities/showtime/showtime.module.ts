import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieDbServiceSharedModule } from 'app/shared/shared.module';
import { ShowtimeComponent } from './showtime.component';
import { ShowtimeDetailComponent } from './showtime-detail.component';
import { ShowtimeUpdateComponent } from './showtime-update.component';
import { ShowtimeDeleteDialogComponent } from './showtime-delete-dialog.component';
import { showtimeRoute } from './showtime.route';

@NgModule({
  imports: [MovieDbServiceSharedModule, RouterModule.forChild(showtimeRoute)],
  declarations: [ShowtimeComponent, ShowtimeDetailComponent, ShowtimeUpdateComponent, ShowtimeDeleteDialogComponent],
  entryComponents: [ShowtimeDeleteDialogComponent]
})
export class MovieDbServiceShowtimeModule {}
