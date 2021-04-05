import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import {ApplicationPipesModule} from '../application-pipes/application-pipes.module';



@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    ApplicationPipesModule
  ],
  exports: [
    ListUserComponent
  ]
})
export class UsersModule { }
