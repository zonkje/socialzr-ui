import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Post} from '../model/post.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PostService} from './post.service';

@Injectable({providedIn: 'root'})
export class PostsResolverService implements Resolve<Post[]>{

  constructor(private postService: PostService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Promise<Post[]> | Post[] {
    return this.postService.getPosts();
  }

}
