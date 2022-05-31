import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from '../../../service/comment.service';
import {PostComment} from '../../../model/post-comment.model';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private commentService: CommentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getComments();
  }


  private getComments() {
    this.subscription = this.commentService.getCommentsByPost(this.postId)
      .subscribe((comments: PostComment[]) => {
        this.comments = comments;
        this.isEmpty = this.comments.length < 1;
      });
  }

  onNewComment() {
    this.router.navigate(['comment/new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
