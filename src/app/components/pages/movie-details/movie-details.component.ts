import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { Observable, take } from 'rxjs';
import { FunctionComponent } from "../function/function.component";
import { IFunction } from '@app/shared/interfaces/function.interface';
import { IMovie } from '@app/shared/interfaces/movie.interface';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.css',
    imports: [CommonModule, FunctionComponent]
})
export class MovieDetailsComponent {
  movie?:IMovie;
  movieId?:number;

  // functionList?:Observable<IFunction>;

  public functionList?:Observable<IFunction[]>;

  constructor(private movieServices:MoviesService, 
              private ActRouter: ActivatedRoute,
    ) {}

  ngOnInit(){
    this.loadMovie();
  }
  private loadMovie(){
    this.ActRouter.params.pipe(take(1)).subscribe((params)=>{
      this.movieId = params['id'];
      this.MovieById(params['id']);
    })
  }

 public async MovieById(movieId: number){
    this.movieServices.getMovieById(movieId)
     .pipe(take(1))
     .subscribe(async (res: any) =>{
      this.movie = res;
     });
  }


 
}
