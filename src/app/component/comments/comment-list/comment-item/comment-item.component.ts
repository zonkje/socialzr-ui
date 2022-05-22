import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostComment} from '../../../../model/post-comment.model';
import {UserService} from '../../../../service/user.service';
import {Subscription} from 'rxjs';
import {User} from '../../../../model/user.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  @Input() comment: PostComment;

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
