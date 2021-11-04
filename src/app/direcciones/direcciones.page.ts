import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { MarkerI } from '../model/Markerl.insterface';
declare var google;


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {
  map = null;
  direccionService = new google.maps.DirectionsService();
  direcccionDibujar = new google.maps.DirectionsRenderer();
  
  constructor(
    private geoLoca : Geolocation,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarMapa();
  }
  async cargarMapa(){
    const cargar= await this.loadingCtrl.create({
      message:"Cargando Mapa..."
    });
    await cargar.present();
    // recuperar nuestra ubicacion actual
    const ubicacionActual= await this.geoLoca.getCurrentPosition(); 

    const ubicacion={
      lat: ubicacionActual.coords.latitude,
      lng: ubicacionActual.coords.longitude
    };
    const mapaHtml: HTMLElement = document.getElementById("map");
    this.map = new google.maps.Map(mapaHtml,{
      center: ubicacion,
      zoom: 20
    });

    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      cargar.dismiss();
      this.AgregarMarcador(ubicacionActual.coords.latitude,ubicacionActual.coords.longitude,'sede');
      this.dibujarMarcadores();
    });
  }

  public AgregarMarcador(lat: number,lng:number,titulo:string){
    const marcador= new google.maps.Marker({
      position:{ lat,lng },
      zoom: 20,
      map: this.map,
      title: titulo
    });
    
  }
  // Agregar varios marcadores
  public dibujarMarcadores(){
    this.listaMarcadores.forEach(m=>{
      this.AgregarMarcador(m.position.lat,m.position.lng,m.tittle)
    })
  }
  listaMarcadores: MarkerI[] = [
    {
      position:{ 
        lat: -33.59308323589893,
        lng: -70.5591673084669
      },
      tittle:'Lider'
    },
  ]

}