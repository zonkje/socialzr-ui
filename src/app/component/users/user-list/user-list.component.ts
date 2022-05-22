import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  isEmpty: boolean = true;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.isEmpty = this.users.length < 1;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
