import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Post} from '../../../model/post.model';
import {PostService} from '../../../service/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  subscription: Subscription;
  isEmpty: boolean = true;

  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe();
    this.subscription = this.postService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          this.isEmpty = this.posts.length < 1;
        }
      );
  }

  onNewPost() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
