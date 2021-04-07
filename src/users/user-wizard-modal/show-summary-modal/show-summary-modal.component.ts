import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {AddressInfoModalComponent} from '../address-info-modal/address-info-modal.component';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-show-summary-modal',
  templateUrl: './show-summary-modal.component.html',
  styleUrls: ['./show-summary-modal.component.css']
})
export class ShowSummaryModalComponent implements OnInit {
  @Input() userData: User | any;
  formValid = false;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  closeModal(activeModal: NgbActiveModal): void {
    activeModal.dismiss('Modal Close Action');
    this.userService.resetUserData();
  }

  goToPrevious(activeModal: NgbActiveModal): void {
    activeModal.dismiss('Moving to the previous modal');
    // Navigate to the work page
    this.modalService.open(AddressInfoModalComponent, {
      backdrop: 'static'
    });
  }

  createUpdateUser(activeModal: NgbActiveModal, type: string = 'new'): void {
    const requestType = (type === 'update') ? 'patch' : 'post';
    const usersList = this.userService.getUserList();
    // First Reset the services
    if (type === 'update') {
      this.userService.updateUser(this.userData).subscribe(user => {
        // Replace and Update user-object
        usersList.forEach((element, index) => {
          if (element.id === user.id) {
            usersList[index] = user;
          }
          // Reset User Form
          this.userService.resetUserData();
          // Close Active Modal
          activeModal.close();
        });
      });
    } else {
      this.userService.createNewUser(this.userData).subscribe(user => {
        usersList.push(user);
        // Reset User Form
        this.userService.resetUserData();
        activeModal.close();
      });
    }
  }

  ngOnInit(): void {
    this.userData = this.userService.getUser();
    this.formValid = this.userService.isFormValid();
  }
}
