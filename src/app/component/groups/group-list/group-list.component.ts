import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Group} from '../../../model/group.model';
import {GroupService} from '../../../service/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
  }

  onNewGroup(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
