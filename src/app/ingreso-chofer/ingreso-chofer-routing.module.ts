import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoChoferPage } from './ingreso-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoChoferPageRoutingModule {}
