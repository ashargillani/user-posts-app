import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/comment.model';
import {Post} from '../models/post.model';
import {User} from '../../users/models/user.model';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() post: Post = new Post();
  @Input() set usersList(users: User[]) {
    this.userList = users;
    this.setEmailList();
  }
  newComment: Comment;
  userEmailList: string[];
  userList: User[] = [];

  constructor(private postService: PostService) {
    this.newComment = new Comment();
    this.userEmailList = [];
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

  /**
   * Deletes the comment by calling deletComment method of service
   * @param comment - Comment Object
   */
  deleteComment(comment: Comment): void {
    this.postService.deleteComment(comment).subscribe(() => {
      // Replace and Update user-object
      let elementIndex = 0;
      this.comments.forEach((element, index) => {
        if (element.id === comment.id) {
          elementIndex = index;
        }
      });
      // Remove Element from users Array
      this.comments.splice(elementIndex, 1);
      // Alert
      alert('Successfully deleted the comment');
    });
  }

  setEmailList(): void {
    // Add all the emails to user-list
    this.userList.forEach((user: User) => {
      if (this.userEmailList.indexOf(user.email) === -1) {
        this.userEmailList.push(user.email);
      }
    });
  }

  setCommentForm(comment: Comment, el: HTMLElement): void {
    el.scrollIntoView();
    this.newComment = comment;
    // If email not present - add it
    if (this.userEmailList.indexOf(comment.email) === -1) {
      this.userEmailList.push(comment.email);
    }
  }

  ngOnInit(): void {
  }
}
