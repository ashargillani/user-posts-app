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

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private modalService: NgbModal) {
  }

  closeModal(activeModal: NgbActiveModal): void {
    activeModal.dismiss('Modal Close Action');
    this.userService.resetUserData();
  }

  goToPrevious(activeModal: NgbActiveModal): void {
    activeModal.dismiss('Moving to the previous modal');
    // Navigate to the work page
    this.modalService.open(AddressInfoModalComponent);
  }

  createOrUpdateUser(): boolean {
    // First Reset the services
    this.userService.resetUserData();

    return true;
  }

  ngOnInit(): void {
    this.userData = this.userService.getUser();
    this.formValid = this.userService.isFormValid();
  }
}
