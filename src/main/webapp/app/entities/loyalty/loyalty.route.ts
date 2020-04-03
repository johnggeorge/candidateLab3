import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILoyalty, Loyalty } from 'app/shared/model/loyalty.model';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltyDetailComponent } from './loyalty-detail.component';
import { LoyaltyUpdateComponent } from './loyalty-update.component';

@Injectable({ providedIn: 'root' })
export class LoyaltyResolve implements Resolve<ILoyalty> {
  constructor(private service: LoyaltyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoyalty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((loyalty: HttpResponse<Loyalty>) => {
          if (loyalty.body) {
            return of(loyalty.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Loyalty());
  }
}

export const loyaltyRoute: Routes = [
  {
    path: '',
    component: LoyaltyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Loyalties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LoyaltyDetailComponent,
    resolve: {
      loyalty: LoyaltyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Loyalties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LoyaltyUpdateComponent,
    resolve: {
      loyalty: LoyaltyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Loyalties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LoyaltyUpdateComponent,
    resolve: {
      loyalty: LoyaltyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Loyalties'
    },
    canActivate: [UserRouteAccessService]
  }
];
