import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITheater, Theater } from 'app/shared/model/theater.model';
import { TheaterService } from './theater.service';
import { TheaterComponent } from './theater.component';
import { TheaterDetailComponent } from './theater-detail.component';
import { TheaterUpdateComponent } from './theater-update.component';

@Injectable({ providedIn: 'root' })
export class TheaterResolve implements Resolve<ITheater> {
  constructor(private service: TheaterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITheater> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((theater: HttpResponse<Theater>) => {
          if (theater.body) {
            return of(theater.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Theater());
  }
}

export const theaterRoute: Routes = [
  {
    path: '',
    component: TheaterComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Theaters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TheaterDetailComponent,
    resolve: {
      theater: TheaterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Theaters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TheaterUpdateComponent,
    resolve: {
      theater: TheaterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Theaters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TheaterUpdateComponent,
    resolve: {
      theater: TheaterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Theaters'
    },
    canActivate: [UserRouteAccessService]
  }
];
