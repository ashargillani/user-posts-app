import {Injectable} from '@angular/core';
import {Address, Personal, User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserWizardService} from './user-wizard.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userDetailsApiUrl = 'https://jsonplaceholder.typicode.com/users/';
  private user = new User();
  personalFormValid = false;
  addressFormValid = false;

  constructor(private http: HttpClient, private userWizardService: UserWizardService) {
  }

  getUserById(user: User): Observable<User> {
    return this.http.get<User>(this.userDetailsApiUrl + user.id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userDetailsApiUrl);
  }

  /**
   * Get Personal Details
   *
   */
  getPersonalDetails(): Personal {
    // Return User Personal Related Fields
    const personal: Personal = {
      name: this.user.name,
      username: this.user.username,
      email: this.user.email
    };

    return personal;
  }

  setPersonalDetails(data: Personal): void {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.personalFormValid = true;
    this.user.name = data.name;
    this.user.username = data.username;
    this.user.email = data.email;
    // Validate Personal Step in Workflow
    this.userWizardService.validateStep('personal');
  }

  getAddressDetails(): Address {
    // Return User Personal Related Fields
    const address: Address = {
      suite: this.user.address.suite,
      street: this.user.address.suite,
      city: this.user.address.city,
    };

    return address;
  }

  setAddressDetails(data: Address): void {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.addressFormValid = true;
    this.user.address.suite = data.suite;
    this.user.address.street = data.street;
    this.user.address.city = data.city;
    // Validate Personal Step in Workflow
    this.userWizardService.validateStep('address');
  }

  // Get updated or edited user
  getUser(): User {
    return this.user;
  }

  // Return true if both the forms were valid
  isFormValid(): boolean {
    return this.personalFormValid && this.addressFormValid;
  }

  /**
   * Reset all user form related data
   */
  resetUserData(): User {
    this.userWizardService.resetSteps();
    this.user.clear();
    this.addressFormValid = this.personalFormValid = false;

    return this.user;
  }
}
