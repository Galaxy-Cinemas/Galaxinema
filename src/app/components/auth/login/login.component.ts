import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '@app/core/models/login.interfaces';
import { responseAuth } from '@app/core/models/response-auth.interface';
import { environment } from '@environment/environment.development';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  formLogin: FormGroup;
  subRef$! : Subscription;
 
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ) 
    {
      this.formLogin = formBuilder.group({
        email:['', Validators.required],
        password: ['', Validators.required]
      });
      
    }

  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

  ngOnInit() {
  }
  
  Login(){
    const usuarioLogin:  Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };


    const url = environment.apim + 'identity/authentication';
    console.log(url);
    this.subRef$ =  this.http.post<responseAuth>(url, usuarioLogin, {observe: 'response'})
             .subscribe(res => {
              const token = res.body?.data;
              sessionStorage.setItem('token', token!);
              this.router.navigate(['/'])
             });

  }
}
