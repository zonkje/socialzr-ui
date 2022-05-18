import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UsersService} from '../../service/users.service';
import {UserContactInformation} from '../../model/user-contact-information.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userContactInformation: UserContactInformation;

  constructor(private userService: UsersService) {
  }

  //TODO -I get undefined before and after subscribing (due to async)
  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      if(this.user.contactInformationId) {
        this.getUserContactInformation(this.user.contactInformationId);
      }
      console.log(this.user);
      console.log(this.userContactInformation);
    });
  }

  private getUserContactInformation(contactInformationId: number) {
    this.userService.getCurrentUserContactInformation(contactInformationId)
      .subscribe(
        (contactInfo: UserContactInformation) => {
          this.userContactInformation = contactInfo;
          console.log(contactInfo);
        }
      );
  }

}
