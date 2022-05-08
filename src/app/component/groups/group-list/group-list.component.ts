import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Group} from '../../../model/group.model';
import {GroupService} from '../../../service/group.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: Group[];
  subscription: Subscription;

  constructor(private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.groupService.groupsChanged
      .subscribe(
        (groups: Group[]) => {
          this.groups = groups;
        }
      );
    this.groups = this.groupService.getGroups();
  }

  onNewGroup() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
