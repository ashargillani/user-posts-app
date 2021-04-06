import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {Post} from '../models/post.model';
import {UserService} from '../../users/services/user.service';
import {User} from '../../users/models/user.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: Post[];

  constructor(private params: ActivatedRoute, private postService: PostService, private userService: UserService, private router: Router) {
    this.posts = [];
  }

  /**
   * Redirect to view post page
   * @param postId - Post Id
   */
  redirectToPosts(postId: number): void {
    this.router.navigate([`posts/${postId}`]);
  }

  ngOnInit(): void {
    const userId = this.params.snapshot.params.userId;
    let userObject: User | undefined;
    // First check if user-list has already been set
    const userList = this.userService.getUserList();
    if (typeof userId !== 'undefined') {
      // No need to call api if already set in userlist
      if (userList.length > 0) {
        userObject = userList.find((user: User) => {
          // tslint:disable-next-line:triple-equals
          return user.id == userId;
        });
        // If user object is found from user-list
        if (typeof userObject !== 'undefined') {
          // Get user-posts
          this.postService.getPostsByUserId(userObject).subscribe((posts: Post[]) => {
            this.posts = posts;
          });
        }
      } else {
        console.error('Test Error');
        // Get user-object first
        this.userService.getUserById(userId).subscribe((user: User) => {
          userObject = user;
          // Then get all posts of user
          this.postService.getPostsByUserId(userObject).subscribe((posts: Post[]) => {
            this.posts = posts;
          });
        });
      }
    } else {
      this.postService.getAllPosts().subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    }
  }
}
