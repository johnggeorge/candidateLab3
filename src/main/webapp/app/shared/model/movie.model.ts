import { IShowtime } from 'app/shared/model/showtime.model';
import { ITheater } from 'app/shared/model/theater.model';

export interface IMovie {
  id?: number;
  name?: string;
  rating?: number;
  genre?: string;
  cast?: string;
  imageContentType?: string;
  image?: any;
  desc?: string;
  showtimes?: IShowtime[];
  theaters?: ITheater[];
}

export class Movie implements IMovie {
  constructor(
    public id?: number,
    public name?: string,
    public rating?: number,
    public genre?: string,
    public cast?: string,
    public imageContentType?: string,
    public image?: any,
    public desc?: string,
    public showtimes?: IShowtime[],
    public theaters?: ITheater[]
  ) {}
}
