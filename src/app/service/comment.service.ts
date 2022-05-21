import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {PostComment} from '../model/post-comment.model';

@Injectable()
export class CommentService {

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

}
