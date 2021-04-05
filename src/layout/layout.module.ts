import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule} from '../app/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, MainComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    PerfectScrollbarModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    AppRoutingModule,
    MainComponent,
    PerfectScrollbarModule
  ]
})

export class LayoutModule { }
