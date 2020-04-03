import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.MovieDbServiceCustomerModule)
      },
      {
        path: 'theater',
        loadChildren: () => import('./theater/theater.module').then(m => m.MovieDbServiceTheaterModule)
      },
      {
        path: 'movie',
        loadChildren: () => import('./movie/movie.module').then(m => m.MovieDbServiceMovieModule)
      },
      {
        path: 'showtime',
        loadChildren: () => import('./showtime/showtime.module').then(m => m.MovieDbServiceShowtimeModule)
      },
      {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(m => m.MovieDbServiceBookingModule)
      },
      {
        path: 'loyalty',
        loadChildren: () => import('./loyalty/loyalty.module').then(m => m.MovieDbServiceLoyaltyModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MovieDbServiceEntityModule {}
