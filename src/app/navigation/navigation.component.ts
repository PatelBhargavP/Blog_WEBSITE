import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  logInStat:any = false;

  constructor(private _authService: AuthService, private _router : Router) {
    if(this._authService.checkLogin()){
      this.logInStat=true;
      this._router.navigate(['/home']);
    }else{
      this.logInStat=false;
    }
   }

  logout(){
    console.log("Logout in Nav")
    this._authService.logOut({logIn:false,token:"",thisuser:""})
  } 

  ngOnInit() {
    this._authService.logToggle.subscribe((data)=>{
      this.logInStat=data;
    })
  }

}
