import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {UserService} from '../../users/services/user.service';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {Comment} from '../models/comment.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post = new Post();
  postUser = new User();
  postComments: Comment[] = [];
  userList: User[] = [];

  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private router: Router) { }

  /**
   * First validates form and then call update-post method of service
   * @param editPostForm - Form Object from html
   */
  updatePost(editPostForm: NgForm): any {
    if (!editPostForm.valid) {
      return false;
    }

    this.postService.updatePost(this.post).subscribe((post: Post) => {
      this.post = post;
      alert('Successfully Updated the post');
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.params.postId;
    if (typeof postId !== 'undefined') {
      this.postService.getPostById(postId).subscribe((post: Post) => {
        if (post) {
          this.post = post;
          // Get Post User
          this.userService.getUserById(post.userId).subscribe((user: User) => {
            this.postUser = user;
          });
          // Get Post Comments
          this.postService.getPostComments(this.post.id).subscribe((comments: Comment[]) => {
            this.postComments = comments;
          });
          // Get Users List
          let userList: User[];
          userList = this.userService.getUserList();
          if (typeof userList === 'undefined' || userList.length === 0) {
            this.userService.getAllUsers().subscribe((users: User[]) => {
              this.userList = users;
            });
          }
        }
        // Load Post User Object Too
      });
    } else {
      this.router.navigate(['posts']);
    }
  }
}
