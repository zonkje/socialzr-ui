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

  private bearer: string = 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c2VybmFtZTEiL' +
    'CJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0Ij' +
    'oxNjUyNjg4MzMyLCJleHAiOjE2NTYxMDgwMDB9.Ds7h38BVR7-HkWfRSgG_4hNfmq3KQmMhFpq4fYONuKY68-uP-lG37u21caun1VGi';

  getPosts() {
    return this.http.get<Post[]>('http://localhost:8080/api/v1/post',
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer),
        params: new HttpParams().set("size", "7")
      },
    ).pipe(
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
    this.http.post<Post>('http://localhost:8080/api/v1/post', post,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  updatePost(index: number, newPost: Post) {
    this.http.patch<Post>('http://localhost:8080/api/v1/post/', newPost,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        }
      );
  }

  deletePost(index: number) {
    this.http.delete('http://localhost:8080/api/v1/post/' + index,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getPosts().subscribe();
          this.postsChanged.next(this.posts);
        },
        error => {
          alert(error.error.messages)
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
