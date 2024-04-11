import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path:'home', component: HomeComponent },
    { path:'movie-details/:id', component: MovieDetailsComponent },
    {path: 'login', component: LoginComponent}
];
