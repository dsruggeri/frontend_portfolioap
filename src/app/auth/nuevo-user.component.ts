import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUser } from '../modelos/nuevo-user';
import { AuthService } from '../servicios/auth.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-user',
  templateUrl: './nuevo-user.component.html',
  styleUrls: ['./nuevo-user.component.css']
})
export class NuevoUserComponent implements OnInit {

  nuevoUser!: NuevoUser;
  email!: string;
  password!: string;
  errMsj!: string;
  isLogged = false;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    //private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }
  }

  

}
