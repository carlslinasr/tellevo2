import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexChoferPageRoutingModule } from './index-chofer-routing.module';

import { IndexChoferPage } from './index-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexChoferPageRoutingModule
  ],
  declarations: [IndexChoferPage]
})
export class IndexChoferPageModule {}
