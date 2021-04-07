import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  sideBarService: SidebarService;
  constructor(sidebarService: SidebarService) {
    this.sideBarService = sidebarService;
  }

  ngOnInit(): void {
  }

}
