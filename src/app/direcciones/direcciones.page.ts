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
  //paradero
  origen = {lat:-33.476771191346, lng:-70.56090899707921};
  //sede
  destino = { lat: -33.59814140567162,lng: -70.57852212888584};
  ubicacionActual = null;
  direccionService = new google.maps.DirectionsService();
  direccionDibujar = new google.maps.DirectionsRenderer();

  constructor(
    private geoLoca : Geolocation,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarMapa();
  }
  async cargarMapa(){
    const cargar = await this.loadingCtrl.create({
      message:"Cargando Mapa..."
    });
    await cargar.present();
    // recuperar nuestra ubicacion actual
    this.ubicacionActual = await this.geoLoca.getCurrentPosition(); 
    const mapaHtml: HTMLElement = document.getElementById("mapa")
    const ubicacion={
      lat: this.ubicacionActual.coords.latitude,
      lng: this.ubicacionActual.coords.longitude
    };

    this.map = new google.maps.Map(mapaHtml, {
      center: ubicacion,
      zoom: 20
    });


    this.direccionDibujar.setMap(this.map);

    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      cargar.dismiss();
     // this.AgregarMarcador(this.ubicacionActual.coords.latitude,this.ubicacionActual.coords.longitude,'sede');
      this.calcularRuta();
    });
  }

  calcularRuta(){
    this.direccionService.route({
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING,
    },(Response,status)=>{
      if(status== google.maps.DirectionsStatus.OK){
        this.direccionDibujar.setDirections(Response);
        console.log("dibujo");
      }else{
        console.log("error al calcular la ruta");
      }
    });
  }
  

  public AgregarMarcador(lat: number, lng: number, titulo: string) {
    const marcador = new google.maps.Marker({
      position:{ lat,lng },
      zoom: 20,
      map: this.map,
      title: titulo
    });
    
  }
  // Agregar varios marcadores
  public dibujarMarcadores(){
    this.listaMarcadores.forEach(m=>{
      this.AgregarMarcador(m.position.lat, m.position.lng, m.tittle)
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
