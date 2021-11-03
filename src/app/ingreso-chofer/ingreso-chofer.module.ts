import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoChoferPageRoutingModule } from './ingreso-chofer-routing.module';

import { IngresoChoferPage } from './ingreso-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoChoferPageRoutingModule
  ],
  declarations: [IngresoChoferPage]
})
export class IngresoChoferPageModule {}
