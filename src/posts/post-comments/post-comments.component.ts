import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from '../models/comment.model';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit, OnChanges {
  @Input() comments: Comment[] = [];
  @Input() post: Post = new Post();
  @Input() userList: User[] = [];
  newComment: Comment;

  constructor(private postService: PostService) {
    this.newComment = new Comment();
  }

  /**
   * Adds a new comment by calling services addComment method
   * @param newCommentForm - Form type object
   */
  // @ts-ignore
  addComment(newCommentForm: any): boolean {
    if (!newCommentForm.valid) {
      return false;
    }

    this.postService.addComment(this.newComment).subscribe((comment: Comment) => {
      this.comments.push(comment);
      alert('Successfully posted the new comment');
      this.newComment = new Comment();

      return true;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('onChanges', this.comments);
  }

}
