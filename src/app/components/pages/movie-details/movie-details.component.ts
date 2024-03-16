import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie:any;
  movieId:any;


  constructor(private apiservices:MoviesService, 
    private ActRouter: ActivatedRoute,

    ) 
    {}


  ngOnInit(){
    this.loadMovie();
    // this.loadFunctionByMovieId();
  }
  private loadMovie(){
    this.ActRouter.params.pipe(take(1)).subscribe((params)=>{
      this.movieId = params['id'];
      this.MovieById(params['id']);
    })
  }
 public async MovieById(movieId: number){
    this.apiservices.getMovieById(movieId)
     .pipe(take(1))
     .subscribe(async (res: any) =>{
      this.movie = res;
      // console.log(this.movie);
     });
  }

}
