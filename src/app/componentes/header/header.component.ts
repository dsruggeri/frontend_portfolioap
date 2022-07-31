import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona';
import { HeaderService } from 'src/app/servicios/header.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  public persona: Persona | undefined;
  public editPersona: Persona | undefined;
  roles!:string[];
  isAdmin= false;

  constructor(private headerService : HeaderService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getPersona();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      }
    });
  }

  public getPersona(): void{
    this.headerService.getPersona().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }



  onOpenModal(mode:string, persona?:Persona):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='edit'){
      this.editPersona=persona;
      button.setAttribute('data-bs-target','#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onEditPersona(persona:Persona){
    this.editPersona=persona;
    document.getElementById('edit-persona-form')?.click();
    this.headerService.updateUsuario(persona).subscribe({
      next: (response:Persona) =>{
        console.log(response);
        this.getPersona();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
        
      }
    })
  }

}
