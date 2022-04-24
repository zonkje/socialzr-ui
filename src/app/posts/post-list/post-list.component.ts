import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [
    new Post(1, new Date(Date.now() -259200000).toDateString(),
      new Date(Date.now()).toDateString(),
      "First post on this app", 1,
      ["ALERT", "HIGH"], 9),
    new Post(2, new Date(Date.now() -(259200000*2)).toDateString(),
      new Date(Date.now()).toDateString(),
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem " +
      "aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. ", 1,
      ["LOW", "TEST"], 4)
  ];

  constructor() {
    console.log(this.posts);
  }

  ngOnInit(): void {
  }

}
