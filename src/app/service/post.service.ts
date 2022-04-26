import {Post} from '../model/post.model';
import {EventEmitter} from '@angular/core';

export class PostService {
  postSelected = new EventEmitter<Post>();

  private posts: Post[] = [
    new Post(1, new Date(Date.now() - 259200000).toDateString(),
      new Date(Date.now()).toDateString(),
      'First post on this app', 1,
      ['ALERT', 'HIGH'], 9),
    new Post(2, new Date(Date.now() - (259200000 * 2)).toDateString(),
      new Date(Date.now()).toDateString(),
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem ' +
      'aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. ', 1,
      ['LOW', 'TEST'], 4)
  ];

  getPosts(){
    return this.posts.slice();
  }

}
