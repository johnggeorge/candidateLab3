import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShowtime, Showtime } from 'app/shared/model/showtime.model';
import { ShowtimeService } from './showtime.service';
import { ShowtimeComponent } from './showtime.component';
import { ShowtimeDetailComponent } from './showtime-detail.component';
import { ShowtimeUpdateComponent } from './showtime-update.component';

@Injectable({ providedIn: 'root' })
export class ShowtimeResolve implements Resolve<IShowtime> {
  constructor(private service: ShowtimeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShowtime> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((showtime: HttpResponse<Showtime>) => {
          if (showtime.body) {
            return of(showtime.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Showtime());
  }
}

export const showtimeRoute: Routes = [
  {
    path: '',
    component: ShowtimeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Showtimes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShowtimeDetailComponent,
    resolve: {
      showtime: ShowtimeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Showtimes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShowtimeUpdateComponent,
    resolve: {
      showtime: ShowtimeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Showtimes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShowtimeUpdateComponent,
    resolve: {
      showtime: ShowtimeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Showtimes'
    },
    canActivate: [UserRouteAccessService]
  }
];
