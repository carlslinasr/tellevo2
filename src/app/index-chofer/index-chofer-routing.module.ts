import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexChoferPage } from './index-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: IndexChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexChoferPageRoutingModule {}
