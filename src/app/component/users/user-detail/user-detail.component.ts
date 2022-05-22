import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: number;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.user = this.userService.getUser(this.id);
        }
      )
  }

}
