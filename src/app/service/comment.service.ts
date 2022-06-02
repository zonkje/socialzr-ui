import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {PostComment} from '../model/post-comment.model';
import {environment} from '../../environments/environment';
import {error} from 'protractor';

@Injectable()
export class CommentService {

  entityName: string = 'comment';

  commentsChanged = new Subject<PostComment[]>();
  private comments: PostComment[] = [];

  constructor(private http: HttpClient) {
  }

  getCommentsByPost(index: number) {
    return this.http.get<PostComment[]>('http://localhost:8080/api/v1/comment/post/' + index)
      .pipe(
        tap(
          comments => {
            this.comments = comments;
            this.commentsChanged.next(this.comments);
          })
      );
  }

  addComment(comment: PostComment) {
    this.http.post<PostComment>('http://localhost:8080/api/v1/comment', comment)
      .subscribe(
        response => {
          this.getCommentsByPost(response.postId).subscribe();
          this.commentsChanged.next(this.comments);
        }
      );
  }

  deleteComment(index: number, postIndex: number) {
    this.http.delete(environment.apiURL + this.entityName + '/' + index)
      .subscribe(
        response => {
          this.getCommentsByPost(postIndex).subscribe();
          this.commentsChanged.next(this.comments);
        },
        error => {
          alert(error.error.messages);
        }
      );
  }

  addCommentThumbUp(commentId: number) {
    return this.http.post(environment.apiURL + this.entityName + '/thumb_up', {commentId: commentId});
  }

  deleteCommentThumbUp(commentId: number) {
    this.http.delete(environment.apiURL + this.entityName + '/thumb_up/' +commentId)
      .subscribe();
  }

}
