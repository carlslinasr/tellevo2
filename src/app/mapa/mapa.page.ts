import { Component, OnInit } from '@angular/core';

/** librerias */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { MarkerI } from '../model/Markerl.insterface';
import { ApiService } from '../api.service';
import { AlertController} from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  lat: number=-33.59818608809768;
  lng: number=-70.57848994281932;
  
  // calcular la ruta optima entre 2 puntos
  direccionService = new google.maps.DirectionsService();
  // permite dibujar esta ruta sobre el mapa
  direccionDisplay = new google.maps.DirectionsRenderer();
  
  // desde tu casa hasta la sede
  // punto de inicio de la ruta -33.434687449793685, -70.75497391049868
  origen={ lat:-33.434687449793685 ,lng :-70.75497391049868}
  // punto de termino de la ruta -33.598186088097535, -70.57862941773806
  destino={ lat:-33.598186088097535, lng:-70.57862941773806}

  map = null;

  // variable que recupera la direccion escrita por el usuario
  dire:string;
  // variable que recupera la direccion de google
  direccion_google:string;
  // recuperar latitud y longitud
  latitud:number;
  longitud:number;

  constructor(
    private geoloc : Geolocation,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(){
    this.cargarMapa();
  }
  // metodo que activa la busqueda de direccion
  Direccion(){
    console.log(this.dire);
    this.api.getDireccion(this.dire).subscribe(
      (data)=>{
          console.log(data);
          console.log(data.results[0].formatted_address);
          console.log(data.results[0].geometry.location);
          this.direccion_google=data.results[0].formatted_address;
          this.latitud=data.results[0].geometry.location.lat;
          this.longitud=data.results[0].geometry.location.lng;
          this.Pregunta();
        },
      (e)=>{
        console.log(e);
      }
    );
  }


  async cargarMapa(){
    const carga = await this.loadingCtrl.create({
      message:'Cargando Mapa...'
    });
    await carga.present();
     /// recuperrar nuestra 
    const  ubicacionactual= await this.geoloc.getCurrentPosition();

    const mapaHtml : HTMLElement = document.getElementById("map");
     // crea un marcador para la posicion actual
    const ubicacion = {
      lat: ubicacionactual.coords.latitude,
      lng: ubicacionactual.coords.longitude
    };

    this.map = new google.maps.Map(mapaHtml,{
      center: ubicacion,
      zoom:8
    });

    //asociar el Display Directions con el Mapa
    this.direccionDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      carga.dismiss();
      //this.AgregarMarcador(ubicacionactual.coords.latitude,ubicacionactual.coords.longitude,'sede')
      //this.dibujarMarcador();
      this.calcularRuta();
    });
  }
  //preguntar si agrega el punto
  async Pregunta(){
    const alert = await this.alertCtrl.create({
      header:'Agregar Punto',
      message: '¿Desea agregar <strong>'+this.direccion_google+'</strong> ?',
      buttons:[
        {
          text:"Cancelar",
          handler:()=>{
            console.log("cancelo")
          }
        },
        {
          text:"Aceptar",
          handler:()=>{
            console.log("agregar punto");
            this.agregarPunto();
          }
        }
      ]
    });
    await alert.present();
  }
  // metodo para agregar un punto a la ruta
  agregarPunto(){
    const wp={
      location:{
        lat:this.latitud,
        lng: this.longitud
      },stopover:true
    }
    const parada={
      ubicacion: this.direccion_google,
      lat: this.latitud,
      lng: this.longitud
    };
    this.listaParadas.push(parada);
    this.wayPoints.push(wp);
    this.calcularRuta();
  }

  async Eliminar(parada: Paradas){
    const alert= await this.alertCtrl.create({
      header:'Eliminar Parada',
      message:'¿Desea Eliminar parada <strong>'+parada.ubicacion+'</strong>?',
      buttons:[
        {
          text:"cancelar",
          handler:()=>{

          }
        },
        {
          text:"Aceptar",
          handler:()=>{
            this.quitarPunto(parada);
          }
        }
      ]
    });
    await alert.present();
  }
  // metodo quitar punto
  quitarPunto(p:Paradas){
    const wpT: WayPoint[]=[];
    this.wayPoints.forEach(item => {
      if (!(p.lat==item.location.lat && p.lng==item.location.lng)) {
        wpT.push(item);
      }
    });
    this.wayPoints=wpT;
    const pTemp: Paradas[]=[];
    this.listaParadas.forEach(item => {
      if (item.ubicacion!=p.ubicacion) {
        pTemp.push(item);
      }
    });
    this.listaParadas=pTemp;
    this.calcularRuta();
  }
  // metodo que permite agregar un marcador
  public AgregarMarcador(lat: number, lng: number, titulo: string){
    const marcador = new google.maps.Marker({
      position:{lat , lng },
      zoom:8,
      map: this.map,
      title: titulo

    });
    
  }
  //// agragar varios marcadore
  public dibujarMarcador(){
    this.listaMarcadores.forEach(m=>{
      this.AgregarMarcador(m.position.lat,m.position.lng,m.title);
    });
  }
  // crear metodo que permita calcular la ruta entre 2 puntos
  private calcularRuta(){
    this.direccionService.route({
      origin: this.origen,
      destination: this.destino,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },(response, status)=>{
      if (status== google.maps.DirectionsStatus.OK) {
         this.direccionDisplay.setDirections(response);
         console.log("dibujo");
      }else{
        console.log("error al calcular la ruta "+status);
      }
    }
    );
  } 
  
  // lista de marcadores-33.53707172955689, -70.6629776030623
  listaMarcadores : MarkerI[] = [
    {
      position:{
      lat:-33.5763103,
      lng: -70.56029649999999
    },
    title:'Casa'
  },
  {
    position:{
      lat:-33.60955,
      lng:  -70.57590999999999
    },
    title:'Duc Puente Alto'
  }
  ]
  wayPoints: WayPoint[]=[]
  listaParadas: Paradas[]=[]

}

//// crear nuevo objeto (crear las paradas en nuestra ruta)
interface WayPoint{
  location:{
    lat:number,
    lng:number
  },
  stopover:boolean
}
// crear objeto para visualizar las rutas
interface Paradas{
  ubicacion:string,
  lat:number,
  lng:number
}