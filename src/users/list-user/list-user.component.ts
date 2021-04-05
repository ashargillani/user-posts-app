import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
    this.users = [];
  }

  ngOnInit(): void {
    /**
     * Fetch all user objects
     */
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}
