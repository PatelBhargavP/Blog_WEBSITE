import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from '../post.service';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  posts:any =[];
  index:string;
  

  constructor(private _postService:PostService) { }

  ngOnInit() {
    console.log("post service")
    this._postService.getPost().subscribe((data:any)=>{
      this.posts=data;
      this._postService.viewPost.next(this.posts[0]);
      console.log(this.posts,"retrived posts");
    });
    this._postService.updatePost.subscribe((data:any)=>{
      // this.posts=data;
      this.posts[this.index]=data[0];
      console.log(this.posts,"From subject in list component  ")
    })    
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  addLikeFn(msg:any){
    console.log("add like",msg.ID);
    this.index=msg.index;
    this._postService.addLikeFn({"postID":msg.ID})
    // .subscribe((data:any)=>{
    //   console.log(data[0].likes);
    //   this.posts[msg.index].likes=data[0].likes;
    //   console.log("Current post",this.posts[msg.index].likes);
      // this.posts[msg.index]=data;
    // });
  }

  removeLikeFn(msg:any){
    console.log("remove like",msg.ID)
    this.index=msg.index;
    this._postService.removeLikeFn({"postID":msg.ID})
    // .subscribe((data:any)=>{
    //   console.log(data[0].likes);      
    //   this.posts[msg.index].likes=data[0].likes;
    //   console.log("Current post",this.posts[msg.index].likes)
      // this.posts[msg.index]=data;
    // });
  }
  // view(ID:string){
  //   this._postService.viewCurrent(ID)
  // }

  postCommentFn(msg:any){}

  // viewCurrent(i){
  //   this.index=i;
  //   // setTimeout(() => {
  //   //   this._postService.viewPost.next(this.posts[i]);
  //   // }, 5);
  //   this._postService.viewPost.next(this.posts[i]);
  // }

}
