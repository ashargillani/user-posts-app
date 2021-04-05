import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalInfoModalComponent } from '../user-wizard-modal/personal-info-modal/personal-info-modal.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.users = [];
  }

  userWizardModal(type: string): void {
    this.modalService.open(PersonalInfoModalComponent);
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
