import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IShowtime } from 'app/shared/model/showtime.model';

type EntityResponseType = HttpResponse<IShowtime>;
type EntityArrayResponseType = HttpResponse<IShowtime[]>;

@Injectable({ providedIn: 'root' })
export class ShowtimeService {
  public resourceUrl = SERVER_API_URL + 'api/showtimes';

  constructor(protected http: HttpClient) {}

  create(showtime: IShowtime): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(showtime);
    return this.http
      .post<IShowtime>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(showtime: IShowtime): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(showtime);
    return this.http
      .put<IShowtime>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShowtime>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShowtime[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(showtime: IShowtime): IShowtime {
    const copy: IShowtime = Object.assign({}, showtime, {
      time: showtime.time && showtime.time.isValid() ? showtime.time.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((showtime: IShowtime) => {
        showtime.time = showtime.time ? moment(showtime.time) : undefined;
      });
    }
    return res;
  }
}
