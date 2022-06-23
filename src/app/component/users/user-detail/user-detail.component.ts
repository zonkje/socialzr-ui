import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {UserContactInformation} from '../../../model/user-contact-information.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: number;
  userContactInformation: UserContactInformation;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.userService.getUserById(this.id).subscribe(
            (user: User) => {
              this.user = user;
              this.userService.getUserContactInformation(this.user.id)
                .subscribe(
                  (userContactInformation: UserContactInformation) => {
                    this.userContactInformation = userContactInformation;
                  }
                );
            }
          );

        }
      );
  }

}
