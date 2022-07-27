import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../modelos/jwt-dto';
import { LoginUsuario } from '../modelos/login-usuario';
import { UsuarioAp } from '../modelos/usuario-ap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8080/auth';

  constructor(private httpClient:HttpClient) { }

  public nuevo(usuarioAp:UsuarioAp):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'nuevo',usuarioAp);
  }

  public login(loginUsuario:LoginUsuario): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'login', loginUsuario);
  }
}
