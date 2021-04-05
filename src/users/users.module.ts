import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { ApplicationPipesModule } from '../application-pipes/application-pipes.module';
import { PersonalInfoModalComponent } from './user-wizard-modal/personal-info-modal/personal-info-modal.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListUserComponent, PersonalInfoModalComponent],
  imports: [
    CommonModule,
    ApplicationPipesModule,
    NgbDatepickerModule,
    FormsModule
  ],
  exports: [
    ListUserComponent
  ]
})
export class UsersModule { }
