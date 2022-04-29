import { Component, OnInit } from '@angular/core';

import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupService]
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}