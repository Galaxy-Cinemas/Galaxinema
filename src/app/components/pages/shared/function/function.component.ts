import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IFunction } from '@app/shared/interfaces/function.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-function',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './function.component.html',
  styleUrl: './function.component.css'
})
export class FunctionComponent  {
  // @Input() items?: IFunction[] = [];

  @Input() items?:Observable<IFunction[]>;
  functionList:IFunction[] = [];

  ngOnInit(){
    // this.items.map((i, index) =>{
    //   i.FunctionId = index;
    // })
  }

  // loadFuctionList(){
  //   this.items?.subscribe(data => {
  //     this.functionList = data;

  //     // Extraer día y hora de la fecha para cada objeto
  //     this.functionList.forEach(item => {
  //       const fecha = new Date(item.FunctionDate); // Suponiendo que el campo se llama 'fecha'
  //       item.dia = fecha.getDate(); // Guardar el día
  //       item.hora = fecha.getHours() + ':' + fecha.getMinutes(); // Guardar la hora en formato HH:MM
  //     });
  //   });
  // } 


}
