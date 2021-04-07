import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {Comment} from '../models/comment.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }
  postsApiUrl = `${environment.apiBaseUrl}posts/`;
  commentsApiUrl = `${environment.apiBaseUrl}comments/`;
  postsList: Post[] = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  postsByUserId = (user: User) => {
    return `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
  }

  /**
   * Provides the array of all posts
   * @returns - array of posts of user.id
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsApiUrl);
  }

  /**
   * Provides the array of posts by user.id
   * @param user - Parameter of User Type must be provided
   * @returns - array of posts of user.id
   */
  getPostsByUserId(user: User): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsByUserId(user));
  }

  /**
   * Provides the post by post id
   * @param postId - Parameter of number type should be provided
   * @returns - post
   */
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.postsApiUrl + postId);
  }

  /**
   * Delete post to the user-list
   * @param post - Post Type Object
   */
  deletePost(post: Post): Observable<User> {
    return this.http.delete<User>(this.postsApiUrl + post.id);
  }

  /**
   * Returns posts-list
   * @return - List of posts
   */
  getPostList(): Post[] {
    return this.postsList;
  }

  /**
   * Sets posts-list
   */
  setPostList(postsList: Post[]): void {
    this.postsList = postsList;
  }

  /**
   * Returns posts-list
   * @return - List of posts
   */
  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postsApiUrl}${postId}/comments`);
  }

  /**
   * Adds a new comment
   * @param newComment - Comment Object
   */
  addComment(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsApiUrl}`, newComment, this.httpOptions);
  }

  /**
   * Deletes the comment
   * @param comment - Comment Object
   */
  deleteComment(comment: Comment): Observable<any> {
    return this.http.delete(`${this.commentsApiUrl}${comment.id}`);
  }
}
