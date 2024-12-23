import { Component, OnInit } from '@angular/core';
import { IMovie } from '@app/core/models/movie.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService } from '@app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{

constructor(private movieServices:MoviesService,
    private router: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService) 
{ }

items:IMovie | undefined
movieList?:any = [];
isAdmin: boolean = false;


ngOnInit(): void{
  this.loadMovieList();
  this.checkUserRole(); 
  }
  private query : string = '';

  loadMovieList(){
  
    this.router.params.subscribe( params =>{
      this.query = params['query'];
      if (this.query == '' || this.query == undefined) {
        this.AllMovies();
      } else {
        this.AllMoviesByQuery(this.query );
      }
    })
  } 

  AllMovies(){
    this.movieList = this.movieServices.getAllMovie();
  }

  AllMoviesByQuery(query:string){
    this.movieList = this.movieServices.getAllMoviesByQuery(query);
  }

  checkUserRole() {
    this.isAdmin = this.auth.getRoleFromToken() === 'Admin';  
  }

  deleteMovie(filmId: number) {
    const confirmation = window.confirm('Are you sure you want to delete this movie?');
    if (confirmation) {
      this.movieServices.deleteMovieById(filmId).subscribe((res) => 
        {
          setTimeout(() => {
            this.loadMovieList();
            this.toastr.success('Movie deleted successfully.', 'Deletion completed');
          },1100);
         
        });;
    }

  }
}
