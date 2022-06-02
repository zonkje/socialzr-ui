import {Post} from '../model/post.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class PostService {

  entityName: string = 'post';

  postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>(environment.apiURL + this.entityName)
      .pipe(
        tap(
          posts => {
            this.posts = posts;
            this.postsChanged.next(this.posts);
          })
      );
  }

  addPost(post: Post) {
    this.http.post<Post>(environment.apiURL + this.entityName, post)
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  updatePost(index: number, newPost: Post) {
    this.http.patch<Post>(environment.apiURL + this.entityName, newPost)
      .subscribe(
        response => {
          console.log("UPDATED");
          console.log(response);
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  deletePost(index: number) {
    this.http.delete(environment.apiURL + this.entityName + index)
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        },
        error => {
          alert(error.error.messages);
        }
      );
  }

  addPostThumbUp(postId: number) {
    return this.http.post(environment.apiURL + this.entityName + '/thumb_up', {postId: postId});
  }

  deletePostThumbUp(postId: number) {
    this.http.delete(environment.apiURL + this.entityName + '/thumb_up/' +postId)
      .subscribe();
  }

  getPost(index: number) {
    return this.findPostById(index);
  }

  private findPostById(postId: number): Post {
    for (let post of this.posts) {
      if (post.id === postId) {
        return post;
      }
    }
    return null;
  }

}
