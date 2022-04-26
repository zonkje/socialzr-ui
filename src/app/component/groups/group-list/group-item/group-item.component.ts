import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../model/group.model';
import {GroupService} from '../../../../service/group.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.groupService.groupSelected.emit(this.group);
  }

}
