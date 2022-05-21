import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../model/group.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
