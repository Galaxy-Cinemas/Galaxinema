import { Component } from '@angular/core';
import { IMovie } from '@app/core/models/movie.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

items:IMovie | undefined

movieList?:any = [];

isAdmin: boolean = false;

constructor(private movieServices:MoviesService,
             private router: ActivatedRoute,
             private auth: AuthService) 
{ 

}

ngOnInit(): void{
  this.loadMovieList();
  this.checkUserRole(); 
  }

  loadMovieList(){
    this.router.params.subscribe( params =>{
      this.AllMovies();
    })
  } 

  AllMovies(){
    this.movieList = this.movieServices.getAllMovie();
  }

  checkUserRole() {
    this.isAdmin = this.auth.getRoleFromToken() === 'Admin';  
  }
}
