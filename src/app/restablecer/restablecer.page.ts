import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  constructor(public alertController: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  async enviar(){
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Se ha enviado el correo de restablecimiento al correo ingresado',
      buttons: ['Aceptar']
    });

    await alert.present();

    this.navCtrl.navigateForward('/login');
  }

}
