import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';
import {Subscription} from 'rxjs';
import {UserContactInformation} from '../../../model/user-contact-information.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAddress} from '../../../model/user-address.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  user: User;
  userContactInformation: UserContactInformation;
  subscription: Subscription;
  editProfileForm: FormGroup;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
    });
    this.getUser();
  }

  onSubmit() {
    let updatedUser: User = new User(
      this.user.id,
      null,
      null,
      null,
      this.editProfileForm.value['firstName'],
      this.editProfileForm.value['lastName'],
      null,
      null,
    );
    let updatedUserAddress = new UserAddress(
      this.editProfileForm.value['address'],
      this.editProfileForm.value['city'],
      this.editProfileForm.value['zipCode'],
      this.editProfileForm.value['state'],
      this.editProfileForm.value['country'],
    );
    let updatedUserContactInformation = new UserContactInformation(
      this.userContactInformation.id,
      null,
      null,
      this.editProfileForm.value['email'],
      this.editProfileForm.value['phoneNumber'],
      null,
      updatedUserAddress
    );
    this.userService.updateUser(updatedUser);
    this.userService.updateUserContactInformation(updatedUserContactInformation);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initFormValues(user: User, contactInformation: UserContactInformation) {

      this.editProfileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: contactInformation.email,
        phoneNumber: contactInformation.phoneNumber,
        address: contactInformation.address.address,
        city: contactInformation.address.city,
        zipCode: contactInformation.address.zipCode,
        state: contactInformation.address.state,
        country: contactInformation.address.country
      })

  }

  private getUser() {
    this.userService.getCurrentUser().subscribe();
    this.subscription = this.userService.currentUserChanged
      .subscribe(
        (user: User) => {
          this.user = user;
          if (this.user.contactInformationId) {
            this.getUserContactInformation(this.user.contactInformationId, user);
          }
        });
  }

  private getUserContactInformation(contactInformationId: number, user: User) {
    this.userService.getUserContactInformation(contactInformationId)
      .subscribe(
        (contactInfo: UserContactInformation) => {
          this.userContactInformation = contactInfo;
          this.initFormValues(user, contactInfo);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
