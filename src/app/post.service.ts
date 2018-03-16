import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import { NgZone } from '@angular/core';


@Injectable()
export class PostService {
  updatePost = new Subject();
  updateComments = new Subject();
  viewPost = new Subject();

  constructor(private _http : HttpClient, private _router : Router, private _cookieService : CookieService, private _ngZone: NgZone) { }

  createPost(post){
    post.postedBy=this._cookieService.get('thisUser');
    // console.log(post);
    this._http.post('http://localhost:3000/createPost',post)
    .subscribe((data:any)=>{
      if(data.posted==true){
        alert("Post Submitted");
        this._router.navigate(['/list']);
      }else{
        alert("Post not Submitted");
      }
    });
  }

  getPost() {
    console.log("get post called from service");
    return this._http.get('http://localhost:3000/getpost');
  }

  addLikeFn(like){
    like.user=this._cookieService.get("thisUser");
    console.log("From post service addLikeFn");
    this._ngZone.runOutsideAngular(()=>{
      this._http.post('http://localhost:3000/addLike',like).subscribe((data:any)=>{
        this._ngZone.run(()=>{
          this.updatePost.next(data);
        });
    });
    }) 
    // return this._http.post('http://localhost:3000/addLike',like)
  }

  removeLikeFn(like){
    like.user=this._cookieService.get("thisUser");
    console.log("From post service removeLikeFn");
    this._ngZone.runOutsideAngular(()=>{
      this._http.post('http://localhost:3000/removeLike',like).subscribe((data:any)=>{
        this._ngZone.run(()=>{
          this.updatePost.next(data);
        })
    });
    })
    // return this._http.post('http://localhost:3000/removeLike',like)
  }

  // viewCurrent(post){
  //   this._ngZone.runOutsideAngular(()=>{
  //     this._http.post('http://localhost:3000/viewCurrent',{"_id":post}).subscribe((data:any)=>{
  //       this._ngZone.run(()=>{
  //         this.updatethisPost.next(data);
  //       })
  //   });
  //   });
  // }

  viewCurrent(post){
    return this._http.post('http://localhost:3000/viewCurrent',{"_id":post})
  }

  addComment(comment){
    comment.user=this._cookieService.get("thisUser");
    console.log("from postservice comment",comment);
    return this._http.post('http://localhost:3000/addComment',comment);
  }

  fetchToken() {
    return this._cookieService.get('m_token');
  }

}
