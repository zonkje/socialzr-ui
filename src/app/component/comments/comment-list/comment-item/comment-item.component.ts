import {Component, Input, OnInit} from '@angular/core';
import {PostComment} from '../../../../model/post-comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: PostComment;

  constructor() { }

  ngOnInit(): void {
  }

}
