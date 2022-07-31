import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidad } from 'src/app/modelos/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  public habilidadLista:Habilidad[]=[];
  public editHabilidad:Habilidad | undefined;
  public deleteHabilidad:Habilidad | undefined;
  roles!:string[];
  isAdmin=false;
  
  

  constructor(private habilidadService:HabilidadService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getHabilidad();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      }
    });
  }

  public getHabilidad():void{
    this.habilidadService.getHabilidad().subscribe({
      next:(Response:Habilidad[]) =>{
        this.habilidadLista=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, habilidad?:Habilidad):void{
    
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addHabilidadModal');
    } else if(mode==='delete'){
      this.deleteHabilidad=habilidad;
      button.setAttribute('data-bs-taget','#deleteHabilidadModal');
    } else if(mode==='edit'){
      this.editHabilidad=habilidad;
      button.setAttribute('data-bs-taget','#editHabilidadModal');
    }  
    container?.appendChild(button);
    button.click();
  }

  public onAddHabilidad(addForm: NgForm){
    document.getElementById('add-habilidad-form')?.click();
    this.habilidadService.addHabilidad(addForm.value).subscribe({
      next: (response:Habilidad) =>{
        console.log(response);
        this.getHabilidad();
        addForm.resetForm();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
      }
    })

    console.log('salió del service');
  }

  public onEditHabilidad(habilidad:Habilidad){
    this.editHabilidad=habilidad;
    document.getElementById('edit-habilidad-form')?.click();
    this.habilidadService.editHabilidad(habilidad).subscribe({
      next: (response:Habilidad) =>{
        console.log(response);
        this.getHabilidad();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
      }
    })
  }

  public onDeleteHabilidad(idHabilidad:number):void{
    this.habilidadService.deleteHabilidad(idHabilidad).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getHabilidad(); 
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

 


}
