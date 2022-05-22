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
  isEmpty: boolean = true;

  constructor(private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe();
    this.subscription = this.groupService.groupsChanged
      .subscribe(
        (groups: Group[]) => {
          this.groups = groups;
          this.isEmpty = this.groups.length < 1;
        }
      );
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
