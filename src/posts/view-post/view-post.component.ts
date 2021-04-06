import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {UserService} from '../../users/services/user.service';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {Comment} from '../models/comment.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: Post = new Post();
  postUser = new User();
  postComments: Comment[] = [];

  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private router: Router) { }

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
        }
        // Load Post User Object Too
      });
    } else {
      this.router.navigate(['posts']);
    }
  }

}
