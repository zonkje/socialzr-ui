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
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getCurrentUser()
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

  ngOnDestroy(): void {
  }

}
