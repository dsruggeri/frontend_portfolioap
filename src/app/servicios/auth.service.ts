import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../modelos/jwt-dto';
import { LoginUser } from '../modelos/login-user';
import { NuevoUser } from '../modelos/nuevo-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpCLient : HttpClient) { }

  public nuevo(nuevoUser: NuevoUser): Observable<any>{
    return this.httpCLient.post<any>(this.authURL+'nuevoUser', nuevoUser)
  }

  public login(loginUser: LoginUser): Observable<JwtDTO>{
    return this.httpCLient.post<JwtDTO>(this.authURL+'login', loginUser);
  }
}
