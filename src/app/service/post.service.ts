import {Post} from '../model/post.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class PostService {

  postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:8080/api/v1/post')
      .pipe(
        tap(
          posts => {
            this.posts = posts;
            this.postsChanged.next(this.posts);
          })
      );
  }

  getPost(index: number) {
    return this.getPostById(index);
  }

  addPost(post: Post) {
    this.http.post<Post>('http://localhost:8080/api/v1/post', post )
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  updatePost(index: number, newPost: Post) {
    this.http.patch<Post>('http://localhost:8080/api/v1/post/', newPost )
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  deletePost(index: number) {
    this.http.delete('http://localhost:8080/api/v1/post/' + index )
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

  private getPostById(postId: number): Post {
    for (let post of this.posts) {
      if (post.id === postId) {
        return post;
      }
    }
    return null;
  }

}
