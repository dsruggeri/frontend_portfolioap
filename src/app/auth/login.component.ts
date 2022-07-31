import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../modelos/login-user';
import { AuthService } from '../servicios/auth.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  email!:string;
  password!:string;
  roles:string[] = [];
  errMsj:string = "";
  isGuest=false;


  constructor( private tokenService:TokenService,
               private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();     
    }
    if(this.tokenService.getEmail() === 'user@user.com'){
      this.isLogged=false;
      this.isGuest=true;
    }
    
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.email, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged=true;
        this.isLoginFail=false;
        this.tokenService.setToken(data.token!);
        this.tokenService.setEmail(data.email!);
        this.tokenService.setAuthorities(data.authorities!);
        this.roles = data.authorities!;
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged=false;
        this.isLoginFail=true;
        this.errMsj = err.error.mensaje;
        console.log(err.error.mensaje)
      }
    );
  }

}
