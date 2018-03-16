import { Component, OnInit, Input, Output, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnChanges {
  ID: string;
  thisPost :any={};

  constructor(private _activatedRoute : ActivatedRoute, private _router : Router, private _postService : PostService) { 
    // this._postService.viewPost.subscribe((data:any)=>{
    //   this.thisPost=data;
    //   console.log("from constructor");
    //   console.log(this.thisPost);
    // });
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe((data) => {
      this.ID = data['pId'];
      this._postService.viewCurrent(data['pId']).subscribe((data:any)=>{
        // console.log("from ngOnInIt");
        this.thisPost=data[0];
        console.log(this.thisPost,"after view current");
      });
    });
    this._postService.updatePost.subscribe((data:any)=>{
      // this.posts=data;
      this.thisPost=data[0];
      console.log(this.thisPost,"From subject in list component  ")
    })    
   
  }

  ngOnChanges(changes: SimpleChanges  ) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
   
  }
  addLikeFn(msg:any){
    console.log("add like",msg.ID);
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
    this._postService.removeLikeFn({"postID":msg.ID})
    // .subscribe((data:any)=>{
    //   console.log(data[0].likes);      
    //   this.posts[msg.index].likes=data[0].likes;
    //   console.log("Current post",this.posts[msg.index].likes)
      // this.posts[msg.index]=data;
    // });
  }

  backtolist() {
    this._router.navigate(['/list']);
  }

}
