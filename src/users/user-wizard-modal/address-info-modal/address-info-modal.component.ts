import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {Address} from '../../models/user.model';
import {PersonalInfoModalComponent} from '../personal-info-modal/personal-info-modal.component';
import {ShowSummaryModalComponent} from '../show-summary-modal/show-summary-modal.component';

@Component({
  selector: 'app-address-info-modal',
  templateUrl: './address-info-modal.component.html',
  styleUrls: ['./address-info-modal.component.css']
})
export class AddressInfoModalComponent implements OnInit {
  // @ts-ignore
  address: Address;

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private modalService: NgbModal) {
  }

  closeModal(activeModal: NgbActiveModal): void {
    activeModal.dismiss('Modal Close Action');
    this.userService.resetUserData();
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.userService.setAddressDetails(this.address);

    return true;
  }

  goToNext(form: any, activeModal: NgbActiveModal): void {
    if (this.save(form)) {
      activeModal.dismiss('Address Info Filled Successfully');
      // Navigate to the summary page
      this.modalService.open(ShowSummaryModalComponent, {
        backdrop: 'static'
      });
    }
  }

  goToPrevious(form: any, activeModal: NgbActiveModal): void {
    activeModal.dismiss('Moving to the previous modal');
    // Navigate to the work page
    this.modalService.open(PersonalInfoModalComponent, {
      backdrop: 'static'
    });
  }

  ngOnInit(): void {
    this.address = this.userService.getAddressDetails();
  }

}
