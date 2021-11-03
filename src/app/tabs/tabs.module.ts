import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [{
  path:'',
  component: TabsPage,
  children: [
    { path: 'inicio', loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule) },
    { path: 'mapa',
    loadChildren: () => import('../mapa/mapa.module').then( m => m.MapaPageModule)},
    {path: 'perfil',
    loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)}
  ]
}]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
