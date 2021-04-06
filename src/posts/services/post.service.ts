import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  allPostsApiUrl = 'https://jsonplaceholder.typicode.com/posts/';
  postsByUserId = (user: User) => {
    return `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
  }

  constructor(private http: HttpClient) { }

  /**
   * Provides the array of all posts
   * @returns - array of posts of user.id
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.allPostsApiUrl);
  }

  /**
   * Provides the array of posts by user.id
   * @param user - Parameter of User Type must be provided
   * @returns - array of posts of user.id
   */
  getPostsByUserId(user: User): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsByUserId(user));
  }
}
