import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {Comment} from '../models/comment.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {
  }

  postsApiUrl = `${environment.apiBaseUrl}posts/`;
  commentsApiUrl = `${environment.apiBaseUrl}comments/`;
  commentsOfPostApiUrl = `${environment.apiBaseUrl}comments?postId=`;
  postsList: Post[] = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  postsByUserId = (user: User) => {
    return `${environment.apiBaseUrl}users/${user.id}/posts`;
  }

  /**
   * Get call to the all posts api
   * @returns - Observable of array of post objects
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsApiUrl);
  }

  /**
   * Get call to the posts by user id api
   * @param user - Parameter of user type must be provided
   * @returns - Observable of array of post objects
   */
  getPostsByUserId(user: User): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsByUserId(user));
  }

  /**
   * Get call to the post by post id api
   * @param postId - Parameter of number type should be provided
   * @returns - Observable of post type object
   */
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.postsApiUrl + postId);
  }

  /**
   * Put call to update post api
   * @param post - Post type object
   * @returns - Observable of updated post type object
   */
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postsApiUrl}${post.id}`, post, this.httpOptions);
  }


  /**
   * Deletes post object
   * @param post - Post type object
   */
  deletePost(post: Post): Observable<User> {
    return this.http.delete<User>(this.postsApiUrl + post.id);
  }

  /**
   * Returns locally stored post-list
   * @return - List of post type objects
   */
  getPostList(): Post[] {
    return this.postsList;
  }

  /**
   * Sets local posts-list
   */
  setPostList(postsList: Post[]): void {
    this.postsList = postsList;
  }

  /**
   * Get call to the all comments api
   * @return - Observable of array of comments
   */
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsApiUrl);
  }

  /**
   * Get call to comments by post id api
   * @return - Observable of array of list of comments
   */
  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsOfPostApiUrl}${postId}`);
  }

  /**
   * Post call to the new comment api
   * @param newComment - Comment Object
   */
  addComment(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsApiUrl}`, newComment, this.httpOptions);
  }

  /**
   * Put call to the update comment api
   * @param updatedComment - Comment Object
   */
  updateComment(updatedComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsApiUrl}${updatedComment.id}`, updatedComment, this.httpOptions);
  }

  /**
   * Delete call to the comment api
   * @param comment - Comment Object
   */
  deleteComment(comment: Comment): Observable<any> {
    return this.http.delete(`${this.commentsApiUrl}${comment.id}`);
  }

}
