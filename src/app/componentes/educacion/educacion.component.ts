import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educacionLista:Educacion[]=[];
  public editEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;
  roles!:string[];
  isAdmin= false;

  

  constructor(private educacionService:EducacionService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getEducacion();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      }
    });
  }



  public getEducacion():void{
    this.educacionService.getEducacion().subscribe({
      next:(Response:Educacion[]) =>{
        this.educacionLista=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, educacion?:Educacion):void{
    
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addEducacionModal');
    } else if(mode==='delete'){
      this.deleteEducacion=educacion;
      button.setAttribute('data-bs-taget','#deleteEducacionModal');
    } else if(mode==='edit'){
      this.editEducacion=educacion;
      button.setAttribute('data-bs-taget','#editEducacionModal');
    }  
    container?.appendChild(button);
    button.click();

  }

  public onAddEducacion(addForm: NgForm){
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe({
      next: (response:Educacion) =>{
        console.log(response);
        this.getEducacion();
        addForm.resetForm();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
      }
    })

    console.log('salió del service');
  }

  public onEditEducacion(educacion:Educacion){
    this.editEducacion=educacion;
    document.getElementById('edit-educacion-form')?.click();
    this.educacionService.editEducacion(educacion).subscribe({
      next: (response:Educacion) =>{
        console.log(response);
        this.getEducacion();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        
        
      }
    })
  }

  public onDeleteEducacion(idEducacion:number):void{
    this.educacionService.deleteEducacion(idEducacion).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getEducacion(); 
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
}
