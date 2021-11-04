import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  slides = [
    {
      img: 'assets/img/gps.svg',
      titulo: 'Con esta aplicación podras llegar a casa sin problemas despues de clase'
    },
    {
      img: 'assets/img/2.svg',
      titulo: 'Puedes elegir entre ser un pasajero o un conductor'
    },
    {
      img: 'assets/img/proteger.svg',
      titulo: 'Viaja comodo y seguro <br>con tus compañeros de instituto con TeLlevoApp!'
    },
  ];
  constructor() {

  }

  ngOnInit() {
  }

}
