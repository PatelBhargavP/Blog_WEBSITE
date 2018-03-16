import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { AuthGuard } from './auth.guard';
import { AuthinterceptorService } from './authinterceptor.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LikeComponent } from './list/like/like.component';
import { ViewComponent } from './list/view/view.component';
import { CommentComponent } from './list/comment/comment.component';
import { ListcommentComponent } from './list/listcomment/listcomment.component';
import { BsModalModule } from 'ng2-bs3-modal';  

import * as $ from 'jquery';
import { LikeCommentComponent } from './list/comment/like-comment/like-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    ListComponent,
    RegisterComponent,
    PagenotfoundComponent,
    LikeComponent,
    ViewComponent,
    CommentComponent,
    ListcommentComponent,
    LikeCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BsModalModule,
    RouterModule.forRoot([
      { path:'home', component: HomeComponent,canActivate : [AuthGuard]},
      { path:'login', component: LoginComponent},
      { path:'register', component: RegisterComponent},
      { path:'create', component: CreateComponent,canActivate : [AuthGuard]},
      { path:'list', component: ListComponent,canActivate : [AuthGuard]},
      {path:'view/:pId', component: ViewComponent}
      // { path:'', redirectTo:'login', pathMatch:'full'}    
      // { path:'**', component:PagenotfoundComponent }
    ])
  ],
  providers: [CookieService,AuthService,PostService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
