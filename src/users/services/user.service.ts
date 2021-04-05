import { Injectable } from '@angular/core';
import {Personal, User} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserWizardService} from './user-wizard.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userDetailsApiUrl = 'https://jsonplaceholder.typicode.com/users/';
  private user = new User();
  personalFormValid = false;
  addressFormValid = false;

  constructor(private http: HttpClient, private userWizardServiceService: UserWizardService) { }

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
    this.userWizardServiceService.validateStep('personal');
  }
}
