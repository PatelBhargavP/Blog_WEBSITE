import { Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy } from '@angular/core';
import { PostService } from '../../post.service';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comments:any=[];
  @Input() ID :any;
  @Input() index:Number;
  @Output() addComment : EventEmitter<any> = new EventEmitter();
  @Output() removeComment : EventEmitter<any> = new EventEmitter();
  noOfComment:Number;
  styleValue:string="none";
  thisComment:any={};

  constructor( private _postService:PostService ) { }

  ngOnInit() {
    this.noOfComment=this.comments.length;
    console.log(this.comments,"comments for",this.index,"Post");
  
  }

  showComment(){
    if(this.styleValue=="none"){
      this.styleValue="block";
    }else if(this.styleValue=="block"){
      this.styleValue="none";
      // this._postService.updateComments.unsubscribe();
    }
  }

  postComment(){
    this.thisComment.id=this.ID;
    this._postService.addComment(this.thisComment).subscribe((data)=>{
      console.log(data[0].comments,"Data from component");
      this.comments=data[0].comments;
      this.noOfComment=this.comments.length
      this.thisComment.comment="";
    });
    // this._postService.updateComments.subscribe((data)=>{
    //   console.log("from sub in comment",data);
    //   this.comments=data;
      // this.noOfComment=this.comments.length
      // this.thisComment.comment="";
    //   this._postService.updateComments.unsubscribe();
    // })
    console.log("postComment",this.thisComment);
    // return this.addComment({"ID":this})
    
  }

  ngOnDestroy(){
    this._postService.updateComments.unsubscribe();
  }


}
