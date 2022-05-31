import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PostComment} from '../model/post-comment.model';
import {CommentService} from './comment.service';

@Injectable({providedIn: 'root'})
export class CommentsResolverService implements Resolve<PostComment[]> {

  constructor(private commentService: CommentService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PostComment[]> | Promise<PostComment[]> | PostComment[] {
    return this.commentService.getCommentsByPost(route.params['id']);
  }

}
