import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupDetailComponent} from './component/groups/group-detail/group-detail.component';
import {GroupEditComponent} from './component/groups/group-edit/group-edit.component';

import {GroupsComponent} from './component/groups/groups.component';
import {PostDetailComponent} from './component/posts/post-detail/post-detail.component';
import {PostEditComponent} from './component/posts/post-edit/post-edit.component';
import {PostStartComponent} from './component/posts/post-start/post-start.component';
import {PostsComponent} from './component/posts/posts.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ReportComponent} from './component/report/report.component';
import {UsersComponent} from './component/users/users.component';
import {GroupListComponent} from './component/groups/group-list/group-list.component';
import {PostsResolverService} from './service/posts-resolver.service';
import {GroupsResolverService} from './service/groups-resolver.service';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'post', pathMatch: 'full'},
  {
    path: 'post', component: PostsComponent, children: [
      {path: '', component: PostStartComponent},
      {path: 'new', component: PostEditComponent},
      {path: ':id', component: PostDetailComponent, resolve: [PostsResolverService]},
      {path: ':id/edit', component: PostEditComponent, resolve: [PostsResolverService]}
    ]
  },
  {
    path: 'group', component: GroupsComponent, children: [
      {path: '', component: GroupListComponent},
      {path: 'new', component: GroupEditComponent},
      {path: ':id', component: GroupDetailComponent, resolve: [GroupsResolverService]},
      {path: ':id/edit', component: GroupEditComponent, resolve: [GroupsResolverService]}
    ]
  },
  {path: 'user', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'report', component: ReportComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
