import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Persona } from '../modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl='https://portfoliodsr.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getPersona():Observable<Persona>{
    return this.http.get<Persona>(`${this.apiServerUrl}/persona/id/1`);
  }

  public updateUsuario(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiServerUrl}/persona/update/${persona.id}`, persona);
  }
}
