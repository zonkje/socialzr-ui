import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {PostsComponent} from './component/posts/posts.component';
import {PostListComponent} from './component/posts/post-list/post-list.component';
import {PostDetailComponent} from './component/posts/post-detail/post-detail.component';
import {PostItemComponent} from './component/posts/post-list/post-item/post-item.component';
import {ProfileComponent} from './component/profile/profile.component';
import {GroupsComponent} from './component/groups/groups.component';
import {ReportComponent} from './component/report/report.component';
import {GroupListComponent} from './component/groups/group-list/group-list.component';
import {GroupItemComponent} from './component/groups/group-list/group-item/group-item.component';
import {GroupDetailComponent} from './component/groups/group-detail/group-detail.component';
import {UsersComponent} from './component/users/users.component';
import {UserListComponent} from './component/users/user-list/user-list.component';
import {UserItemComponent} from './component/users/user-list/user-item/user-item.component';
import {UserDetailComponent} from './component/users/user-detail/user-detail.component';
import {DropdownDirective} from './directive/dropdown.directive';
import {PostStartComponent} from './component/posts/post-start/post-start.component';
import {PostEditComponent} from './component/posts/post-edit/post-edit.component';
import {GroupEditComponent} from './component/groups/group-edit/group-edit.component';
import {PostService} from './service/post.service';
import {GroupService} from './service/group.service';
import {ShortenPipe} from './pipe/shorten.pipe';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {LoadingSpinnerComponent} from './component/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './service/auth-interceptor.service';
import {UserService} from './service/user.service';
import {CommentService} from './service/comment.service';
import {CommentsComponent} from './component/comments/comments.component';
import {CommentListComponent} from './component/comments/comment-list/comment-list.component';
import {CommentItemComponent} from './component/comments/comment-list/comment-item/comment-item.component';
import {CommentEditComponent} from './component/comments/comment-edit/comment-edit.component';
import {TimeAgoPipe} from './pipe/time-ago.pipe';
import {UserStartComponent} from './component/users/user-start/user-start.component';
import {ProfileEditComponent} from './component/profile/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostItemComponent,
    ProfileComponent,
    GroupsComponent,
    ReportComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupDetailComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    UserDetailComponent,
    DropdownDirective,
    PostStartComponent,
    PostEditComponent,
    GroupEditComponent,
    ShortenPipe,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    CommentsComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentEditComponent,
    TimeAgoPipe,
    UserStartComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService, GroupService, UserService, CommentService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
