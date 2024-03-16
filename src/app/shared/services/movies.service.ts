import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
urlBase = `http://localhost:5033/ApiGateway/`;
// urlBase = `http://localhost:37061/`;


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
