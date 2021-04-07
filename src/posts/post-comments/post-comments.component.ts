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
  confirmationMessage = 'Are you sure you want to delete this Post?';
  commentAddedMessage = 'Successfully added the comment';
  commentDeletedMessage = 'Successfully deleted the comment';

  constructor(private postService: PostService) {
    this.newComment = new Comment();
    this.userEmailList = [];
  }

  /**
   * Adds a new comment by calling services addComment method
   * @param newCommentForm - Form type object
   */
  addComment(newCommentForm: any): any {
    if (!newCommentForm.valid) {
      return false;
    }

    // Check if comment is new or it needs to update
    if (this.newComment.id !== 0) {
      // Then update comment
      this.postService.updateComment(this.newComment).subscribe((comment: Comment) => {
        alert(this.commentAddedMessage);
        this.newComment = new Comment();
      });
    } else {
      // Call post service addComment method
      this.postService.addComment(this.newComment).subscribe((comment: Comment) => {
        this.comments.push(comment);
        alert(this.commentAddedMessage);
        this.newComment = new Comment();
      });
    }
  }

  /**
   * Deletes the comment by calling deleteComment method of service
   * @param comment - Comment Object
   */
  deleteComment(comment: Comment): void {
    if (confirm(this.confirmationMessage)) {
      this.postService.deleteComment(comment).subscribe(() => {
        // Replace and Update user-object
        let elementIndex = 0;
        this.comments.forEach((element, index) => {
          if (element.id === comment.id) {
            elementIndex = index;
          }
        });
        // Remove element from users Array
        this.comments.splice(elementIndex, 1);
        // Alert
        alert(this.commentDeletedMessage);
      });
    }
  }

  /**
   * Sets email list - used in create comment form
   */
  setEmailList(): void {
    // Add all the emails to user-list
    this.userList.forEach((user: User) => {
      if (this.userEmailList.indexOf(user.email) === -1) {
        this.userEmailList.push(user.email);
      }
    });
  }

  /**
   * Sets comment form with selected comment
   * @param comment - Comment Object
   * @param el - Html element ref to scroll and focus
   */
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
