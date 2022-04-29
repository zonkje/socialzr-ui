import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from './component/posts/posts.component';
import {GroupsComponent} from './component/groups/groups.component';
import {UsersComponent} from './component/users/users.component';
import {ProfileComponent} from './component/profile/profile.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'post', pathMatch: 'full'},
  {path: 'post', component: PostsComponent},
  {path: 'group', component: GroupsComponent},
  {path: 'user', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'report', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
