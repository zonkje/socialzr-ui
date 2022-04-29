import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { PostService } from 'src/app/service/post.service';
import {Post} from '../../../model/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  id: number;

  constructor(private postService: PostService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.post = this.postService.getPost(this.id);
      }
    );
  }

  onEditPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
