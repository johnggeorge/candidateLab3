import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILoyalty } from 'app/shared/model/loyalty.model';

type EntityResponseType = HttpResponse<ILoyalty>;
type EntityArrayResponseType = HttpResponse<ILoyalty[]>;

@Injectable({ providedIn: 'root' })
export class LoyaltyService {
  public resourceUrl = SERVER_API_URL + 'api/loyalties';

  constructor(protected http: HttpClient) {}

  create(loyalty: ILoyalty): Observable<EntityResponseType> {
    return this.http.post<ILoyalty>(this.resourceUrl, loyalty, { observe: 'response' });
  }

  update(loyalty: ILoyalty): Observable<EntityResponseType> {
    return this.http.put<ILoyalty>(this.resourceUrl, loyalty, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoyalty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoyalty[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
