import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { GroupDetailComponent } from './component/groups/group-detail/group-detail.component';
import { GroupEditComponent } from './component/groups/group-edit/group-edit.component';

import { GroupsComponent } from './component/groups/groups.component';
import { PostDetailComponent } from './component/posts/post-detail/post-detail.component';
import { PostEditComponent } from './component/posts/post-edit/post-edit.component';
import { PostStartComponent } from './component/posts/post-start/post-start.component';
import { PostsComponent } from './component/posts/posts.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ReportComponent } from './component/report/report.component';
import { UsersComponent } from './component/users/users.component';
import {GroupListComponent} from './component/groups/group-list/group-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'post', pathMatch: 'full'},
    { path: 'post', component: PostsComponent, children: [
        { path: '', component: PostStartComponent },
        { path: 'new', component: PostEditComponent},
        { path: ':id', component: PostDetailComponent },
        { path: ':id/edit', component: PostEditComponent}
    ] },
    { path: 'group', component: GroupsComponent, children: [
        { path: '', component: GroupListComponent },
        { path: 'new', component: GroupEditComponent},
        { path: ':id', component: GroupDetailComponent },
        { path: ':id/edit', component: GroupEditComponent}
    ] },
    { path: 'user', component: UsersComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'report', component: ReportComponent },
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
