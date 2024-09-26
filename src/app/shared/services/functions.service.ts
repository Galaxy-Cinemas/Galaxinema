import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Observable, map } from 'rxjs';
import { IFunction, ResponseObject } from '../../core/models/function.interface';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  urlBase = `${environment.apim}`;
  constructor(private http: HttpClient) { }

  //-------------------------------------------------  FUNCTIONS -------------------------------------------------------------------------------------------------------

  getAllFunctions(){
    let urlBase = `${environment.apim}`;
    let search = `Function/GetAll`;
    return this.sendQuery(urlBase + search);
  }

  getFunctionByMovieId(movieId:number):Observable<ResponseObject>{
    let Endpoint = `Function/GetByMovieId/${movieId}`;
    let test = this.sendQuery(this.urlBase + Endpoint);
    return this.sendQuery(this.urlBase + Endpoint);
  }
  getFunctionById(functionId:number):Observable<IFunction>{
    let Endpoint = `Function/GetById/${functionId}`;
    return this.sendQuery(this.urlBase + Endpoint);
  }

  NewFunction(func: IFunction):Observable<IFunction>{
    let Endpoint = `Function/Create`;
    let query = this.urlBase + Endpoint;
    // console.log(query)
    return this.http.post<IFunction>(`${query}`, func);
  }

  deleteFunctionById(id:number):Observable<number>{
    let Endpoint = `Function/Delete/${id}`;
    let query = this.urlBase + Endpoint;
    return this.http.delete<number>(`${query}`);
  }

  //-------------------------------------------------  QUERY -------------------------------------------------------------------------------------------------------
  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data));
  }
}
