import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userDetailsApiUrl = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private http: HttpClient) { }

  getUserById(user: User): Observable<User> {
    return this.http.get<User>(this.userDetailsApiUrl + user.id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userDetailsApiUrl);
  }
}
