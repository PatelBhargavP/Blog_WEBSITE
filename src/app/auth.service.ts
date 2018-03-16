import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  logToggle = new Subject();
  current:string;

  constructor(private _http : HttpClient, private _router : Router, private _cookieService : CookieService) { }

  loginUser(details){
    this._http.post('http://localhost:3000/loginuser', details)
    .subscribe((data:any) => {
      console.log(data,"after login");
      if(data.loggedIn==true) {
        this._cookieService.set('loggedIn', data.loggedIn);
        this._cookieService.set('m_token', data.token);
        // console.log(data.thisUser,", before stringify");
        // console.log(JSON.stringify(data.thisUser),",After Stringify");
        // this.current=JSON.stringify(data.thisUser);
        // console.log(this.current,",After Storing");
        this._cookieService.set('thisUser', data.thisUser);
        this.logToggle.next(true);
        this._router.navigate(['/home']);
      } else {
        alert("Incorrect username or password");
        this._router.navigate(['/login']);
      }
    });
  }

  createuser(details){
    this._http.post('http://localhost:3000/createuser', details)
    .subscribe((data:any) => {
      console.log(data);
      if(data.registered==true) {
        this._router.navigate(['/login']);
      } else {
        alert("Username is already taken");
      }
    });
  }

  checkLogin() {
    return this._cookieService.get('loggedIn');
  }

  fetchToken() {
    return this._cookieService.get('m_token');
  }

  currentUser(){
    return this._cookieService.get('thisUser')
  }

  logOut(para){
    console.log("logout in auth");
    console.log(para);
    this._cookieService.set('loggedIn', para.logIn);
    this._cookieService.set('m_token', para.token);
    this._cookieService.set('thisUser', para.thisuser);
    this.logToggle.next(false);
    this._router.navigate(['/login']);
  }

}
