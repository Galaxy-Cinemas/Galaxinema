import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interfaces/movie.interface';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

urlBase = `${environment.apim}`;

  constructor(private http: HttpClient) { }

  getAllMovie()
  {
    let EndPoint = `Movie/GetAll`;
    return this.sendQuery(this.urlBase + EndPoint);
  }

  getMovieById(id:number):Observable<IMovie>{
    
    let search = `Movie/GetById/${id}`;
    return this.sendQuery(this.urlBase + search);
  }

  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }
}
