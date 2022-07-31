import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { NuevoUserComponent } from './auth/nuevo-user.component';
import { HomeComponent } from './componentes/home/home.component';

import { EducacionGuardService as guard } from './guards/educacion-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component:LoginComponent },
//  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
