import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../modelos/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiServerUrl='https://portfoliodsr.herokuapp.com';

  constructor(private http:HttpClient) { }

  public getEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/listar`);
  }

  public addEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/agregar`,educacion);
  }

  public editEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/update/${educacion.idEducacion}`,educacion);
  }

  public deleteEducacion(idEducacion:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${idEducacion}`);
  }

}
