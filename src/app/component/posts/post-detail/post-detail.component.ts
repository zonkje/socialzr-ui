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
    this.loggedUserId = JSON.parse(localStorage.getItem('loggedUserData'))['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.postService.getPostById(this.id)
            .subscribe((post: Post) => {
              this.post = post;
              this.userService.getUserById(this.post.authorId)
                .subscribe(
                  (user: User) => {
                    this.user = user;
                  }
                );
            });

        }
      );

  }

  onEditPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onThumbUp() {
    this.postService.addPostThumbUp(this.post.id)
      .subscribe(() => {
          console.log("DODAJE");
        },
        error => {
          console.log("USUWAM");
          const errorMsg = error.error.messages;
          console.log(errorMsg[0]);
          const expectedErrorMsg = 'User with ID: ' + this.loggedUserId +
            ' has already given a thumb up to widget with ID: ' + this.post.id;
          if (errorMsg.length == 1 && errorMsg[0] == expectedErrorMsg) {
            console.log("MSG SIE ZGADZA");
            this.postService.deletePostThumbUp(this.post.id);
          }
        });

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'post', this.post.id]));
  }

  onDeletePost() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/post']);
  }

}
