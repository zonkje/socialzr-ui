import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {GroupService} from 'src/app/service/group.service';
import {Group} from '../../../model/group.model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group;
  id: number;
  loggedUserId: number;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loggedUserId = JSON.parse(localStorage.getItem('loggedUserData'))['id']
    const id = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.group = this.groupService.getGroup(this.id);
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
