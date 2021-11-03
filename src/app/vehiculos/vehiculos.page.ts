import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  constructor( public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  vehiculo = new FormGroup({
    patente: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required)
  });

  lista_vehiculos = new Array();

  vehi: any;

  async guardar() {
    if(this.vehiculo.invalid){
      const alert = await this.alertController.create({
        header: 'Datos invalidos',
        message: 'Rellena todos los campos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    this.vehi = {
      patente: this.vehiculo.controls.patente.value,
      nombre: this.vehiculo.controls.nombre.value,
      modelo: this.vehiculo.controls.modelo.value,
      cantidad: this.vehiculo.controls.cantidad.value
    };
    this.lista_vehiculos.push(this.vehi);
    var datos= this.lista_vehiculos;
    localStorage.setItem('misvehiculos',JSON.stringify(datos));
    const alert = await this.alertController.create({
      header: 'Vehiculo registrado',
      message: 'Se ha registrado el vehiculo',
      buttons: ['Aceptar']
    });

    await alert.present();
    
    this.navCtrl.navigateForward('/index-chofer');

  }

  }


