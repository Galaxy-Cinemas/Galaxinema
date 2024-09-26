import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { Observable, take } from 'rxjs';
import { FunctionComponent } from "../function/function.component";
import { IFunction } from '@app/core/models/function.interface';
import { IMovie } from '@app/core/models/movie.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  trustedTrailerUrl?: SafeResourceUrl;

  // functionList?:Observable<IFunction>;

  public functionList?:Observable<IFunction[]>;

  constructor(private movieServices:MoviesService, 
              private ActRouter: ActivatedRoute,
              private sanitizer: DomSanitizer
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
      if (this.movie && this.movie.trailer) {
        this.trustedTrailerUrl = this.sanitizeUrl(this.movie.trailer);
        console.log(this.trustedTrailerUrl)
      }
     });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


 
}
