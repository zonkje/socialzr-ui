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
import {FormsModule} from '@angular/forms';
import {UsersComponent} from './component/users/users.component';
import {UserListComponent} from './component/users/user-list/user-list.component';
import {UserItemComponent} from './component/users/user-list/user-item/user-item.component';
import {UserDetailComponent} from './component/users/user-detail/user-detail.component';
import {DropdownDirective} from './directive/dropdown.directive';

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
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
