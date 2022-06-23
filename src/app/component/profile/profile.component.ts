import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {UserContactInformation} from '../../model/user-contact-information.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription;
  userContactInformation: UserContactInformation;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe();
    this.subscription = this.userService.currentUserChanged
      .subscribe(
        (user: User) => {
          this.user = user;
          if (this.user.contactInformationId) {
            this.getUserContactInformation(this.user.contactInformationId);
          }
        });
  }

  private getUserContactInformation(contactInformationId: number) {
    this.userService.getUserContactInformation(contactInformationId)
      .subscribe(
        (contactInfo: UserContactInformation) => {
          this.userContactInformation = contactInfo;
        }
      );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
