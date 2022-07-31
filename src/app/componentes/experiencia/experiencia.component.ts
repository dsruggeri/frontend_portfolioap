import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/modelos/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {

  public experienciaLista:Experiencia[]=[];
  public editExperiencia:Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;
  roles!: string[];
  isAdmin = false;

  constructor(private experienciaService:ExperienciaService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getExperiencia();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      }
    });
  }

  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response:Experiencia[]) =>{
        this.experienciaLista=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, experiencia?:Experiencia):void{
    
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addExperienciaModal');
    } else if(mode==='delete'){
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-bs-taget','#deleteExperienciaModal');
    } else if(mode==='edit'){
      this.editExperiencia=experiencia;
      button.setAttribute('data-bs-taget','#editExperienciaModal');
    }  
    container?.appendChild(button);
    button.click();

  }

  public onAddExperiencia(addForm: NgForm){
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response:Experiencia) =>{
        console.log(response);
        this.getExperiencia();
        addForm.resetForm();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
      }
    })

    console.log('salió del service');
  }

  public onEditExperiencia(experiencia:Experiencia){
    this.editExperiencia=experiencia;
    document.getElementById('edit-experiencia-form')?.click();
    this.experienciaService.editExperiencia(experiencia).subscribe({
      next: (response:Experiencia) =>{
        console.log(response);
        this.getExperiencia();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
      }
    })
  }

  public onDeleteExperiencia(idExperiencia:number):void{
    this.experienciaService.deleteExperiencia(idExperiencia).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getExperiencia(); 
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
