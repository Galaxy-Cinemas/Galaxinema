import { Component } from '@angular/core';
import { Movie } from '@app/shared/interfaces/movie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '@app/shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

items:Movie | undefined

movieList?:any= [];

constructor(private apiservices:MoviesService, private router: ActivatedRoute,
  private router2: Router ) 
{ 

}

ngOnInit(): void{
  this.loadMovieList();
  
  }

  loadMovieList(){
    this.router.params.subscribe( params =>{
      this.AllMovies();
    })
  }


  AllMovies(){
    this.movieList = this.apiservices.getAllMovie();
  }
}
