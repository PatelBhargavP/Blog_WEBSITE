import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../loginuser.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cred : UserLogin={
    username:"",
    password:""
};

  constructor(private _authService : AuthService) { }

  authenticate(){
    console.log("authenticate from angular");
    this._authService.loginUser(this.cred);
  }

  ngOnInit() {
  }

}
