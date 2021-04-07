import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonalInfoModalComponent} from '../user-wizard-modal/personal-info-modal/personal-info-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private modalService: NgbModal, private route: Router) {
    this.users = [];
  }

  /**
   * Returns primitive types as is, if object, joins all object properties
   * @param propertyValue - can be object | number | string
   * @return string - result string
   */
  simplifyPropertyValue(propertyValue: any): string {
    let value = '';
    if (typeof propertyValue !== 'object') {
      value = propertyValue;
    } else {
      // Iterate over all properties
      for (const key in propertyValue) {
        if (Object.prototype.hasOwnProperty.call(propertyValue, key) && typeof propertyValue[key] === 'string') {
          // @ts-ignore
          value = (value === '') ? propertyValue[key] : `${value}, ${propertyValue[key]}`;
        }
      }
    }

    return value;
  }

  /**
   * Opens Personal Information Modal
   * @param user - user object should be provided in case of update
   */
  personalInfoModal(user?: User): void {
    if (typeof user !== 'undefined') {
      this.userService.setUser(user);
    }
    this.modalService.open(PersonalInfoModalComponent, {
      backdrop: 'static'
    });
  }

  /**
   * Sends delete request to server and removes user locally as-well
   * @param user - User type Object
   */
  removeUser(user: User): void {
    // First Reset the services
    this.userService.deleteUser(user).subscribe(() => {
      // Replace and Update user-object
      let elementIndex = 0;
      this.users.forEach((element, index) => {
        if (element.id === user.id) {
          elementIndex = index;
        }
      });
      // Remove Element from users Array
      this.users.splice(elementIndex, 1);
      // Alert
      alert('User successfully deleted');
    });
  }

  /**
   * Redirect to user posts
   * @param userId - Users Id
   */
  redirectToUserPosts(userId: number): void {
    this.route.navigate([`users/${userId}/posts`]);
  }

  ngOnInit(): void {
    /**
     * Fetch all user objects
     */
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      // Set the list so that it can be shared
      this.userService.setUserList(this.users);
    });
  }
}
