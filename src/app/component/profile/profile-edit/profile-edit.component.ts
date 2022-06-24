import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';
import {Subscription} from 'rxjs';
import {UserContactInformation} from '../../../model/user-contact-information.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAddress} from '../../../model/user-address.model';
import {ViewportScroller} from '@angular/common';

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
  websitesURLs: FormArray;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private scroller: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.scroller.scrollToAnchor('targetEditForm');
    this.editProfileForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'avatarUrl': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'websitesURLs': this.fb.array([])
    });
    this.getUser();
  }

  newWebsiteURL(url?: string): FormGroup {
    let initURL = '';
    if (typeof url !== 'undefined') {
      initURL = url;
    }
    return this.fb.group({
      'websiteURL': new FormControl(initURL, Validators.required)
    });
  }

  addWebsiteURL(url?: string) {
    this.websitesURLs = this.editProfileForm.get('websitesURLs') as FormArray;
    if (typeof url !== 'undefined') {
      this.websitesURLs.push(this.newWebsiteURL(url));
    } else {
      this.websitesURLs.push(this.newWebsiteURL());
    }
  }

  removeWebsiteURL(index: number) {
    this.websitesURLs.removeAt(index);
  }

  onSubmit() {
    let updatedUser: User = new User(
      this.user.id,
      null,
      null,
      null,
      this.editProfileForm.value['firstName'],
      this.editProfileForm.value['lastName'],
      this.editProfileForm.value['avatarUrl'],
      null,
    );
    let updatedUserAddress = new UserAddress(
      this.editProfileForm.value['address'],
      this.editProfileForm.value['city'],
      this.editProfileForm.value['zipCode'],
      this.editProfileForm.value['state'],
      this.editProfileForm.value['country'],
    );

    let newUserWebsites: string[] = [];
    if ((typeof this.websitesURLs !== 'undefined')) {
      for (let i = 0; i < this.websitesURLs.value.length; i++) {
        newUserWebsites.push(this.websitesURLs.value[i]['websiteURL']);
      }
    } else {
      newUserWebsites = null;
    }

    let updatedUserContactInformation = new UserContactInformation(
      this.userContactInformation.id,
      null,
      null,
      this.editProfileForm.value['email'],
      this.editProfileForm.value['phoneNumber'],
      newUserWebsites,
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
      avatarUrl: user.avatarUrl,
      address: contactInformation.address.address,
      city: contactInformation.address.city,
      zipCode: contactInformation.address.zipCode,
      state: contactInformation.address.state,
      country: contactInformation.address.country
    });

    if (typeof this.websitesURLs == 'undefined') {
      for (let url of contactInformation.websitesURLs) {
        this.addWebsiteURL(url);
      }
    }

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
