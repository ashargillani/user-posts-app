import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPostComponent} from './list-post/list-post.component';
import {ApplicationPipesModule} from '../application-pipes/application-pipes.module';
import { ViewPostComponent } from './view-post/view-post.component';


@NgModule({
  declarations: [ListPostComponent, ViewPostComponent],
  imports: [
    CommonModule,
    ApplicationPipesModule
  ],
  exports: [
    ListPostComponent
  ]
})
export class PostsModule {
}
