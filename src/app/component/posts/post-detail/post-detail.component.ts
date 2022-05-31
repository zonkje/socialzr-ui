import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Params, Router} from '@angular/router';

import {PostService} from 'src/app/service/post.service';
import {Post} from '../../../model/post.model';
import {User} from '../../../model/user.model';
import {UserService} from '../../../service/user.service';
import {first, take, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  id: number;
  loggedUserId: number;
  user: User;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    console.log("DETAILS_ON_INIT");
    this.loggedUserId = JSON.parse(localStorage.getItem('loggedUserData'))['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.post = this.postService.getPost(this.id);
          console.log(this.post);
        }
      );
    this.userService.getUserById(this.post.authorId)
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

  onEditPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePost() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/post']);
  }

}
