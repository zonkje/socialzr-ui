import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group.model';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupService]
})
export class GroupsComponent implements OnInit {
  selectedGroup: Group;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.groupSelected
      .subscribe(
        (group: Group) => {
          this.selectedGroup = group;
        }
      )
  }

}
