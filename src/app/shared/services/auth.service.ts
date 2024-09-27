import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from '@environment/environment.development';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.getToken() !== null);

  // Observable para el estado de autenticación
  isLoggedIn$ = this.loggedIn.asObservable();

  private baseUrl : string= environment.apim + 'identity';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/CreateUser`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}/authentication`,loginObj)
    
  }

  signOut(){
    sessionStorage.clear();
    this.setLoggedIn(false);
    this.router.navigate(['login'])
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  storeToken(tokenValue: string){
    if (tokenValue) {
      sessionStorage.setItem('token', tokenValue)
      this.setLoggedIn(true);
    }
  }

  getToken(){
    return sessionStorage.getItem('token')
  }
  getRefreshToken(){
    return sessionStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token')
  }

  private decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    const token =  this.decodedToken()
    if(token)
    return token.role;
  }

}