import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {GroupService} from 'src/app/service/group.service';
import {Group} from '../../../model/group.model';
import {User} from '../../../model/user.model';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group;
  id: number;
  loggedUserId: number;
  creatorUsername: string = '';

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedUserId = JSON.parse(localStorage.getItem('loggedUserData'))['id']
    const id = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.group = this.groupService.getGroup(this.id);
          this.userService.getUserById(this.group.creatorId)
            .subscribe(
              (user: User) => {
                this.creatorUsername = user.username;
              }
            );
        }
      );
  }

  onEditGroup() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePost(){
    this.groupService.deleteGroup(this.id);
    this.router.navigate(['/group']);
  }

}
