import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PostService } from './post.service';

@Injectable()
export class AuthinterceptorService {

  constructor( private _authService : AuthService, private _postService : PostService ) { }

  intercept(req, next) {
    console.log("interceptor",this._postService.fetchToken());

    var authRequest = req.clone({
      headers:new HttpHeaders().set('authorization', this._postService.fetchToken())
    });

    return next.handle(authRequest);
  }

}
