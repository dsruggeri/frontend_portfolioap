import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtDTO } from 'src/app/modelos/jwt-dto';
import { LoginUser } from 'src/app/modelos/login-user';
import { NuevoUser } from 'src/app/modelos/nuevo-user';
import { Persona } from 'src/app/modelos/persona';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  isGuest = false;

  loginUser:LoginUser = new LoginUser('user@user.com', 'user');
  errorMsj!:string;

  constructor(private tokenService:TokenService, private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.login(this.loginUser).subscribe({
      next: (data: JwtDTO) =>{
        this.tokenService.setToken(data.token!);
        this.tokenService.setEmail(data.email!);
        this.tokenService.setAuthorities(data.authorities!);
        this.isGuest=true;
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
      }
    })
  }

}
