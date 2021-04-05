import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {Personal} from '../../models/user.model';

@Component({
  selector: 'app-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.css']
})
export class PersonalInfoModalComponent implements OnInit {
  closeResult = '';
  // @ts-ignore
  personal: Personal;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
  }


  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.userService.setPersonalDetails(this.personal);

    return true;
  }

  goToNext(form: any): void {
    if (this.save(form)) {
      // Navigate to the work page
      alert('Open Next Modal');
    }
  }

  ngOnInit(): void {
    this.personal = this.userService.getPersonalDetails();
  }

}
