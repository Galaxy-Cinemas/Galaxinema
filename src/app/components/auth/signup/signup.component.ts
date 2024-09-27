import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formRegister: FormGroup;
  subRef$! : Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
    ) 
    {
      this.formRegister = formBuilder.group({
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        email:['', Validators.required],
        password: ['', Validators.required]
      });
      
    }

    signUp(){
      if (this.formRegister.valid) {
      
        this.auth.signUp(this.formRegister.value).subscribe({
          next: (res) => {
            console.log(res.message);
            this.formRegister.reset();
            this.router.navigate(['/login'])
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

    }
}
