import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from '../users/list-user/list-user.component';
import {ListPostComponent} from '../posts/list-post/list-post.component';
import {ViewPostComponent} from '../posts/view-post/view-post.component';
import {EditPostComponent} from '../posts/edit-post/edit-post.component';
import {DashboardComponent} from '../dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: ListUserComponent},
  {path: 'posts', component: ListPostComponent},
  {path: 'users/:userId/posts', component: ListPostComponent},
  {path: 'posts/:postId', component: ViewPostComponent},
  {path: 'posts/edit/:postId', component: EditPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
