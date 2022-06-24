import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostComment} from '../../../../model/post-comment.model';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../model/user.model';
import {CommentService} from '../../../../service/comment.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  @Input() comment: PostComment;
  user: User;
  authFlag = false;
  loggedUserId: number;

  constructor(private userService: UserService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.loggedUserId = JSON.parse(localStorage.getItem('loggedUserData'))['id'];
    this.userService.getUserById(this.comment.authorId)
      .subscribe(
        (user: User) => {
          this.user = user;
          this.authFlag = this.user.id == this.loggedUserId;
        }
      );
  }

  // TODO: -add this functionality
  onEditComment() {
    this.router.navigate(['comment/' + this.comment.id + '/edit'], {relativeTo: this.route});
  }

  onDeleteComment() {
    this.commentService.deleteComment(this.comment.id, this.comment.postId);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'post', this.comment.postId]));
  }


  onThumbUp() {
    this.commentService.addCommentThumbUp(this.comment.id)
      .subscribe(() => {
        },
        error => {
          const errorMsg = error.error.messages;
          const expectedErrorMsg = 'User with ID: ' + this.loggedUserId +
            ' has already given a thumb up to widget with ID: ' + this.comment.id;
          if (errorMsg.length == 1 && errorMsg[0] == expectedErrorMsg) {
            this.commentService.deleteCommentThumbUp(this.comment.id);
          }
        });

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'post', this.comment.postId]));
  }

  ngOnDestroy(): void {
  }

}
