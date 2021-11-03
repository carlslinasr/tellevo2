import { Injectable } from '@angular/core';
/* Importamos Librerias */
import { Router } from '@angular/router';  /* Nos permite viajar entre paginas */
import { Storage } from '@ionic/storage';  /* Nos permite almacenar informacion */
import { Platform } from '@ionic/angular';  /*Nos permite trabajar sobre la plataforma */
import { BehaviorSubject } from 'rxjs';  /* Puente entre servicio y aplicacion */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  authState = new BehaviorSubject(false);   /* Creamos objeto de autenticacion, que al ser false no dejara entrar */


  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router
  ) {


  }

  /* Metodos que tendra */
  login() {
    var objeto = {  /* Creamos el objeto de un usuario, asignando el valor para cada atributo */
      user_name: 'juan',
      password: '12345'
    };
    this.storage.create(); /* Instanciamos el storage */
    this.storage.set('USER', objeto).then((resp) => {    /* Enviamos el objeto y le llamamos USER */
      console.log(objeto); /* Enviamos el objeto */
      this.router.navigate(['seleccion']);  /* lo mandamos al menu */
      this.authState.next(true);  /* Esta authenticado */
    });
  }

  logout() {

    this.storage.create();
    this.storage.remove('USER').then(() => {       /* Eliminamos el objeto para salir del login, no le damos un parametro (como resp), y si lo logra remover entonce.... */
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated(): boolean {   /* Este metodo devuelve un booleano*/
    return this.authState.value;  /* Devuelve el valor del objeto que nos sirve para ver si esta autenticado */
  }


  ifLoggin() {    /* Permite saber si estamos logeados */
    this.storage.create();
    this.storage.get('USER').then((response) => {  /* Vemos si esta el Objeto USER, si esta entonces ... */
      if (response) {   /* Si hay datos en el response y conicide, que solo recoge USER */
        this.authState.next(true);   /* Cambiamos el estado del objeto authenticacion a true, por lo que ahora puede acceder*/
      }
    });
  }
}
