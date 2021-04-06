import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from '../models/comment.model';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit, OnChanges {
  @Input() comments: Comment[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('onChanges', this.comments);
  }

}
