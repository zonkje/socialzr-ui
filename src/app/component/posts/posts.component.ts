import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post.model';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostService]
})
export class PostsComponent implements OnInit {
  selectedPost: Post;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.postSelected
      .subscribe(
        (post: Post) => {
          this.selectedPost = post;
        }
      );
  }

}
