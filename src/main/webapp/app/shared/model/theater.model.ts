import { IShowtime } from 'app/shared/model/showtime.model';
import { IMovie } from 'app/shared/model/movie.model';

export interface ITheater {
  id?: number;
  name?: string;
  address?: string;
  imageContentType?: string;
  image?: any;
  showtimes?: IShowtime[];
  movies?: IMovie[];
}

export class Theater implements ITheater {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public imageContentType?: string,
    public image?: any,
    public showtimes?: IShowtime[],
    public movies?: IMovie[]
  ) {}
}
