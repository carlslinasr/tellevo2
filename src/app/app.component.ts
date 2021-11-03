import { Component } from '@angular/core';
/* Implementar liberias */
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private authServ: AuthenticationService
  ) {
    platform.ready().then(() => { /* cuando la plataforma este lista... */
      authServ.authState.subscribe(estado => {    /* Con el suscribe, la maquina esta atenta a lo que ocurre al authenticacion */
        if (estado) {   /* Si el estado es true... */
          router.navigate(['registro']); /* vaya a la pagina de menu  */
        } else {
          router.navigate(['inicio']);  /* y si no, que vuelva al login */
        }
      });
    }); 

  }
}
