import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

/**
 Agregamos los modulos de servicio de autenticacion y authGuard, ademas del sotrage
 */
import { AuthenticationService } from './services/authentication.service';
import { AuthenGuardService } from './services/authen-guard.service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],

  /**
  Ahora debemos definir los servicios de antes en "providers" para que la app los reconozca cuando los usemos.
 */

  providers: [
    Geolocation,
    AuthenGuardService,
    AuthenticationService,
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
