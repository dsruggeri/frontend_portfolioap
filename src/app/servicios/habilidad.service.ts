import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../modelos/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getHabilidad():Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>(`${this.apiServerUrl}/habilidad/listar`);
  }


  public addHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.post<Habilidad>(`${this.apiServerUrl}/habilidad/agregar`,habilidad);
  }

  public editHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.put<Habilidad>(`${this.apiServerUrl}/habilidad/update`,habilidad);
  }

  public deleteHabilidad(idHabilidad:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/habilidad/delete/${idHabilidad}`);
  }


}
