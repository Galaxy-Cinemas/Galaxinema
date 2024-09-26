import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FunctionsService } from '@app/shared/services/functions.service';
import { MoviesService } from '@app/shared/services/movies.service';

@Component({
  selector: 'app-function',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './function.component.html',
  styleUrl: './function.component.css'
})
export class FunctionComponent {

// @Input() movieId!: number;
movieId?:number;
functionList?:any = [];

dataTest?:Date;

constructor(private functionServices:FunctionsService,
            private ActRouter: ActivatedRoute,
            private movieServices:MoviesService) {
  
}

ngOnInit(): void{
  this.loadFunctionByMovieId();
  this.dataTestFunction();
  }

 /* ----------------------------------------------------------------------  GET FUNCTION BY MOVIE ID   ------------------------------------------------------- */
 loadFunctionByMovieId(){
  this.ActRouter.params.subscribe((params)=>{
    this.movieId = 1;
    this.functionByMovieId(params['id']);
  })
}

public functionByMovieId(movieId: number){
  this.functionList = this.functionServices.getFunctionByMovieId(movieId);
  console.log(this.functionList);
}

dataTestFunction(){
  this.dataTest = new Date();
}


 public dateTestSumDay(){
  this.dataTest?.setDate(this.dataTest.getDate() +1)
}

}
