import { Component, OnInit } from '@angular/core';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isGuest = false;

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    if  (this.tokenService.getToken()){
      this.isLogged = true;  
    } else {
      this.isLogged = false;
    }
    if(this.tokenService.getEmail()==='user@user.com'){
      this.isGuest=true;
    }
  }

  onLogOut():void {
    this.tokenService.logOut();
    //window.location.reload();
  }

}
