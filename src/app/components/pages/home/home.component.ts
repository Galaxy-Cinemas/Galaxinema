import { Component } from '@angular/core';
import { MoviesComponent } from "../movies/movies.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MoviesComponent, HttpClientModule]
})
export class HomeComponent {

}
