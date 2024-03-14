import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }
}
