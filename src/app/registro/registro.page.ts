import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder,
    public alertController: AlertController) { 
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Llena todos los campos para continuar',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;

    }



    var usuario = {
      correo: f.correo,
      password: f.password
    }

    const alert = await this.alertController.create({
      header: 'Usuario ingresado',
      message: 'Usuario añadido correctamente',
      buttons: ['Aceptar']
    });

    await alert.present();

    localStorage.setItem('usuario', JSON.stringify(usuario));
  }


}
