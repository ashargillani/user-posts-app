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

  /**
   * Return Observable of user type object
   * @param userId - User id should be provided
   */
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.usersApiUrl + userId);
  }

  /**
   * Return Observable of user type array
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl);
  }

  /**
   * Set user-list locally in service
   * @param users - Users List
   */
  setUserList(users: User[]): void {
    this.usersList = users;
  }

  /**
   * Returns user-list
   */
  getUserList(): User[] {
    return this.usersList;
  }

  /**
   * Posts to new user api
   * @param user - User type object
   */
  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersApiUrl, user, this.httpOptions);
  }

  /**
   * Patch call to update user
   * @param user - User type object
   */
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(this.usersApiUrl + user.id, user, this.httpOptions);
  }

  /**
   * Delete call to the user api
   * @param user - User type object
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
   * Get personal type object for form usage
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
   * Sets personal details
   * @param data - Param Of personal type
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

  /**
   * Get address details object
   */
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
   * Set Address Details
   * @param data - Param of address type
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
