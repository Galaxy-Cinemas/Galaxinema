import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormSearchComponent } from './shared/components/form-search/form-search.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FormSearchComponent]
})
export class AppComponent {
  title = 'GalaXinema';
}
