import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  commentsByPostIdApiUrl = (post: Post) => `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;

  constructor(private http: HttpClient) { }

  /**
   * Provides the array of comments by post.id
   * @param post - Parameter of Post Type must be provided
   * @returns - array of comments of post.id
   */
  getCommentsByPostId(post: Post): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsByPostIdApiUrl(post));
  }
}
