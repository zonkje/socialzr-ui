import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from '../../../service/comment.service';
import {PostComment} from '../../../model/post-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() postId;
  comments: PostComment[] = [];
  subscription: Subscription;
  isEmpty: boolean = true;

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.subscription = this.commentService.getCommentsByPost(this.postId)
      .subscribe((comments: PostComment[]) => {
        this.comments = comments;
        this.isEmpty = this.comments.length < 1;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.subscription = this.commentService.getCommentsByPost(this.postId)
      .subscribe((comments: PostComment[]) => {
        this.comments = comments;
        this.isEmpty = this.comments.length < 1;
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
