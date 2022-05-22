import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {UserContactInformation} from '../../model/user-contact-information.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription;
  userContactInformation: UserContactInformation;

  constructor(private userService: UserService) {
  }

  //TODO -I get undefined before and after subscribing (due to async)
  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe();
    this.subscription = this.userService.userChanged
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
