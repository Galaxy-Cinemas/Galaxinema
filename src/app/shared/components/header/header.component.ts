import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged: boolean = false;

constructor(
  private router: Router,
    private auth: AuthService
) {

  
}
ngOnInit(): void{

  this.auth.isLoggedIn$.subscribe((loggedIn) => {
    this.isLogged = loggedIn;
  });
  }

  signOut(){
    if (this.auth.getToken()) {
      this.auth.signOut()
    }

  }
}
