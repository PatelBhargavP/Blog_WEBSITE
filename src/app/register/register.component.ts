import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register : User = {
    fname:"",
    lname:"",
    username:"",
    password:"",
    location:""
  };

  constructor(private _authService: AuthService) { 
    console.log(this.register);
  }

  registerUser(){
    this._authService.createuser(this.register);
  }

  ngOnInit() {
  }

}
