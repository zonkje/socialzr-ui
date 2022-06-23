import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {LoggedUserData} from '../model/auth/logged-user-data.model';
import {UserContactInformation} from '../model/user-contact-information.model';
import {filter, tap} from 'rxjs/operators';
import {Post} from '../model/post.model';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  entityName: string = 'user';

  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  currentUserChanged = new Subject<User>();
  private currentUser: User = null;

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(environment.apiURL + this.entityName)
      .pipe(
        tap(
          users => {
            this.users = users;
            this.usersChanged.next(this.users);
          })
      );
  }

  getUser(index: number) {
    return this.findUserById(index);
  }

  getUserById(index: number) {
    return this.http.get<User>(environment.apiURL + this.entityName + '/' + index);
  }


  getCurrentUser() {
    let currentUser: LoggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    return this.http.get<User>(environment.apiURL + this.entityName + '/' + currentUser.id)
      .pipe(
        tap(
          user => {
            this.currentUser = user;
            this.currentUserChanged.next(this.currentUser);
          }
        )
      );
  }

  updateUser(user: User) {
    this.http.patch<User>(environment.apiURL + this.entityName, user)
      .subscribe(
        response => {
          this.getCurrentUser().subscribe();
          this.currentUserChanged.next(this.currentUser);
        }
      );
  }

  updateUserContactInformation(contactInformation: UserContactInformation) {
    this.http.patch<User>(environment.apiURL + 'contact_information', contactInformation)
      .subscribe(
        response => {
          this.getCurrentUser().subscribe();
          this.currentUserChanged.next(this.currentUser);
        }
      );
  }

  getUserContactInformation(contactInformationId: number) {
    return this.http.get<UserContactInformation>(environment.apiURL + 'contact_information/' + contactInformationId);
  }

  private findUserById(userId: number): User {
    for (let user of this.users) {
      if (user.id === userId) {
        return user;
      }
    }
    return null;
  }

}
