import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mapa',
        loadChildren: () => import('./../mapa/mapa.module').then( m => m.MapaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./../ingreso/ingreso.module').then( m => m.IngresoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
