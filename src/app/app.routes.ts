import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path:'home', component: HomeComponent },
    { path:'movie-details/:id', component: MovieDetailsComponent }
];
