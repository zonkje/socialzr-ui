import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GroupService} from '../../../service/group.service';
import {Group} from '../../../model/group.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  id: number;
  editMode = false;
  accessLevels = ['PUBLIC', 'PRIVATE'];
  groupForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      let updatedGroup: Group = this.groupService.getGroup(this.id);
      updatedGroup['name'] = this.groupForm.value['name'];
      updatedGroup['description'] = this.groupForm.value['description'];
      updatedGroup['avatarUrl'] = this.groupForm.value['avatarUrl'];
      updatedGroup['accessLevel'] = this.groupForm.value['accessLevel'];
      this.groupService.updateGroup(this.id, updatedGroup);
    } else {
      const newGroup = new Group(
        Math.ceil(Math.random() * 11),
        new Date(Date.now()).toDateString(),
        new Date(Date.now()).toDateString(),
        this.groupForm.value['name'],
        this.groupForm.value['description'],
        this.groupForm.value['avatarUrl'],
        Math.ceil(Math.random() * 11),
        this.groupForm.value['accessLevel']
      );
      this.groupService.addGroup(newGroup);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {

    let imgUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    let groupName = '';
    let groupDescription = '';
    let groupAvatarUrl = '';
    let groupAccessLevel = this.accessLevels[0];

    if (this.editMode) {
      const group = this.groupService.getGroup(this.id);
      groupName = group.name;
      groupDescription = group.description;
      groupAvatarUrl = group.avatarUrl;
      groupAccessLevel = group.accessLevel;

    }
    this.groupForm = new FormGroup({
      'name': new FormControl(groupName, Validators.required),
      'description': new FormControl(groupDescription, Validators.required),
      'avatarUrl': new FormControl(groupAvatarUrl, [
        Validators.required,
        Validators.pattern(imgUrlRegex)]),
      'accessLevel': new FormControl(groupAccessLevel)
    });
  }

}
