import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../model/post.model';
import {User} from '../../../../model/user.model';
import {UserService} from '../../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUserById(this.post.authorId)
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

  onSelectPost() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([this.index], {relativeTo: this.route}));
  }

}
