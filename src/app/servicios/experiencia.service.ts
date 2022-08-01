import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../modelos/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl='https://portfoliodsr.herokuapp.com';

  constructor(private http:HttpClient) { }

  public getExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/listar`);
  }

  public addExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/agregar`,experiencia);
  }

  public editExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/update/${experiencia.idExperiencia}`,experiencia);
  }

  public deleteExperiencia(idExperiencia:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${idExperiencia}`);
  } 



}
