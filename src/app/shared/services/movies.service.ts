import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  ResponseObject } from '../../core/models/movie.interface';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

urlBase = `${environment.apim}`;

  constructor(private http: HttpClient) { }

  getAllMovie()
  {
    let EndPoint = `Movie/GetAllMovies`;
    return this.sendQuery(this.urlBase + EndPoint);
  }

  getMovieById(id:number):Observable<ResponseObject>{
    
    let search = `Movie/GetByMovieId/${id}`;
    return this.sendQuery(this.urlBase + search);
  }

  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data));
  }
}
