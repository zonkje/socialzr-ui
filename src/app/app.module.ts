import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupsComponent } from './groups/groups.component';
import { ReportComponent } from './report/report.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupItemComponent } from './groups/group-list/group-item/group-item.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';

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
    GroupDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
