import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from './component/users/users.component';
import {UserListComponent} from './component/users/user-list/user-list.component';
import {UserItemComponent} from './component/users/user-list/user-item/user-item.component';
import {UserDetailComponent} from './component/users/user-detail/user-detail.component';
import {DropdownDirective} from './directive/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import {PostStartComponent} from './component/posts/post-start/post-start.component';
import {GroupStartComponent} from './component/groups/group-start/group-start.component';
import {PostEditComponent} from './component/posts/post-edit/post-edit.component';
import {GroupEditComponent} from './component/groups/group-edit/group-edit.component';
import {PostService} from './service/post.service';
import {GroupService} from './service/group.service';

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
    GroupStartComponent,
    PostEditComponent,
    GroupEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PostService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
