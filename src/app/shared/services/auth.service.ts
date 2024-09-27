import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from '@environment/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private baseUrl : string= environment.apim + 'identity';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/createUSer`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}/authentication`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    sessionStorage.setItem('token', tokenValue)
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