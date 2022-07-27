import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { HeaderService } from 'src/app/servicios/header.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  public usuario: Usuario | undefined;
  public editUsuario: Usuario | undefined;

  constructor(private headerService : HeaderService, private tokenService:TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    } else{
      this.isLogged=false;
    }
    this.getUsuario();
  }

  public getUsuario(): void{
    this.headerService.getUsuario().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  onLogout():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  onOpenModal(mensaje:string):void{}

}
