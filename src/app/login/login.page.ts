import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)

    });
   }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.correo == f.correo && usuario.password == f.password){
      this.navCtrl.navigateForward('/seleccion');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Usuario y/o contraseña incorrecto',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }

}
