import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // post:Post = {
  //   postBy:"",
  //   title:"",
  //   desc:""
  // };
  post:any = {};

  constructor(private _postService: PostService) { }

  createPost(){
    this._postService.createPost(this.post);
  }

  ngOnInit() {
  }

}
