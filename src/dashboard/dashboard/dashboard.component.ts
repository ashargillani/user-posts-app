import { Component, OnInit } from '@angular/core';
import {UserService} from '../../users/services/user.service';
import {PostService} from '../../posts/services/post.service';
import {Counts} from '../models/counts';
import {User} from '../../users/models/user.model';
import {Post} from '../../posts/models/post.model';
import {Comment} from '../../posts/models/comment.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cardCounts: Counts;
  constructor(private userService: UserService, private postService: PostService) {
    this.cardCounts = new Counts();
  }

  ngOnInit(): void {
    // As we do not have some-specific api to provide us with counts
    // So we will get all data first and then set their counts in cardCounts object
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.cardCounts.userCount = users.length;
    });
    // Get all posts first and then set their length
    this.postService.getAllPosts().subscribe((posts: Post[]) => {
      this.cardCounts.postCount = posts.length;
    });
    // Get all comments and set their length
    this.postService.getAllComments().subscribe((comments: Comment[]) => {
      this.cardCounts.commentCount = comments.length;
    });
  }
}
