import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPostComponent} from './list-post/list-post.component';
import {ApplicationPipesModule} from '../application-pipes/application-pipes.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListPostComponent, ViewPostComponent, PostCommentsComponent],
    imports: [
        CommonModule,
        ApplicationPipesModule,
        FormsModule
    ],
  exports: [
    ListPostComponent
  ]
})
export class PostsModule {
}
