import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadComponent } from './componentes/habilidad/habilidad.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { LoginComponent } from './auth/login.component';
import { NuevoUserComponent } from './auth/nuevo-user.component';
import { MenuComponent } from './menu/menu.component';
import { interceptorProviderEducacion } from './interceptors/educacion-interceptor.service';
import { interceptorProviderExperiencia } from './interceptors/experiencia-interceptor.service';
import { interceptorProviderHabilidad } from './interceptors/habilidad-interceptor.service';
import { HomeComponent } from './componentes/home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EducacionComponent,
    HabilidadComponent,
    ExperienciaComponent,
    LoginComponent,
    NuevoUserComponent,
    MenuComponent,
    HomeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [interceptorProviderEducacion, 
              interceptorProviderExperiencia, 
                interceptorProviderHabilidad],
  bootstrap: [AppComponent]
})
export class AppModule { }
