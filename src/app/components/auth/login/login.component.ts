import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '@app/core/models/login.interfaces';
import { AuthService } from '@app/shared/services/auth.service';
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
    private router: Router,
    private auth: AuthService
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

  Login() {
    if (this.formLogin.valid) {
      
      this.auth.signIn(this.formLogin.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.formLogin.reset();
          this.auth.storeToken(res.data);
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}



