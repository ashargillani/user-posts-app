import {Injectable} from '@angular/core';
import {Address, Personal, User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserWizardService} from './user-wizard.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersApiUrl = `${environment.apiBaseUrl}users/`;
  private usersList: User[] = [];
  private user = new User();
  personalFormValid = false;
  addressFormValid = false;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private userWizardService: UserWizardService) {
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.usersApiUrl + userId);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl);
  }

  /**
   * Set User List locally in service
   * @param users - Users List
   */
  setUserList(users: User[]): void {
    this.usersList = users;
  }

  /**
   * Return User List
   */
  getUserList(): User[] {
    return this.usersList;
  }

  /**
   * Create New User and add it to the user-list
   * @param user - User Type Object
   */
  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersApiUrl, user, this.httpOptions);
  }

  /**
   * Make Update User call to the server
   * @param user - User Type Object
   */
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(this.usersApiUrl + user.id, user, this.httpOptions);
  }

  /**
   * Create New User and add it to the user-list
   * @param user - User Type Object
   */
  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.usersApiUrl + user.id);
  }

  /**
   * Set User as the selected provided
   */
  setUser(user: User): void {
    this.user = user;
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

  /**
   * Set Users Personal Details
   * @param data - Param Of Personal Type
   */
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

  /**
   * Set Users Address Details
   * @param data - Param Of Address Type
   */
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
  resetUserData(activeModal?: NgbActiveModal): User {
    // If active modal open then dismiss it
    if (typeof activeModal !== 'undefined') {
      activeModal.dismiss('Modal close action');
    }
    this.userWizardService.resetSteps();
    this.user = new User();
    this.addressFormValid = this.personalFormValid = false;

    return this.user;
  }
}
