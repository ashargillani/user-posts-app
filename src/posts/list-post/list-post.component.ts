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

  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private router: Router) {
    this.posts = [];
  }

  /**
   * Redirect to view post page
   * @param postId - Post Id
   */
  redirectToViewPost(postId: number): void {
    this.router.navigate([`posts/${postId}`]);
  }

  /**
   * Redirect to edit post page
   * @param postId - Post Id
   */
  redirectToEditPost(postId: number): void {
    this.router.navigate([`posts/edit/${postId}`]);
  }

  /**
   * Delete Post
   * @param post - Post Object
   */
  deletePost(post: Post): void {
    this.postService.deletePost(post).subscribe(() => {
      // Replace and Update user-object
      let elementIndex = 0;
      this.posts.forEach((element, index) => {
        if (element.id === post.id) {
          elementIndex = index;
        }
      });
      // Remove Element from users Array
      this.posts.splice(elementIndex, 1);

      alert('Successfully Removed the Post');
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.userId;
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
