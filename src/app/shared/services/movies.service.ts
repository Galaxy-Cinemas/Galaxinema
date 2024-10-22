import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  ResponseObject } from '../../core/models/movie.interface';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

urlBase = `${environment.localMovies}`;
urlBaseAdmin = `${environment.localMoviesAdmin}`;

  constructor(private http: HttpClient) { }

  getAllMovie()
  {
    let EndPoint = `GetAllMovies`;
    return this.sendQuery(this.urlBase + EndPoint);
  }

  getMovieById(id:number):Observable<ResponseObject>{
    
    let search = `GetByMovieId/${id}`;
    return this.sendQuery(this.urlBase + search);
  }

  deleteMovieById(id:number):Observable<number>{
    let Endpoint = `DeleteMovie/${id}`;
    let query = this.urlBaseAdmin + Endpoint;
    return this.http.delete<number>(`${query}`);
  }

  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data));
  }
}
