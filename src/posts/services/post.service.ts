import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {Comment} from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  allPostsApiUrl = 'https://jsonplaceholder.typicode.com/posts/';
  postsList: Post[] = [];
  postsByUserId = (user: User) => {
    return `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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

  /**
   * Provides the post by post id
   * @param postId - Parameter of number type should be provided
   * @returns - post
   */
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.allPostsApiUrl + postId);
  }

  /**
   * Delete post to the user-list
   * @param post - Post Type Object
   */
  deletePost(post: Post): Observable<User> {
    return this.http.delete<User>(this.allPostsApiUrl + post.id);
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
    return this.http.get<Comment[]>(`${this.allPostsApiUrl}${postId}/comments`);
  }

  /**
   * Adds a new comment
   * @param newComment - Comment Object
   */
  addComment(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.allPostsApiUrl}${newComment.postId}/comments`, newComment, this.httpOptions);
  }
}
