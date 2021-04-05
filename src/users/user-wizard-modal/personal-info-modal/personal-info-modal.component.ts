import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {Personal} from '../../models/user.model';
import {AddressInfoModalComponent} from '../address-info-modal/address-info-modal.component';

@Component({
  selector: 'app-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.css']
})
export class PersonalInfoModalComponent implements OnInit {
  closeResult = '';
  // @ts-ignore
  personal: Personal;

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
    this.userService.setPersonalDetails(this.personal);

    return true;
  }

  goToNext(form: any, activeModal: NgbActiveModal): void {
    if (this.save(form)) {
      // Navigate to the work page
      activeModal.dismiss('First Page Validated');
      this.modalService.open(AddressInfoModalComponent);
    }
  }

  ngOnInit(): void {
    this.personal = this.userService.getPersonalDetails();
  }

}
