import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {LoggedUserData} from '../model/auth/logged-user-data.model';
import {UserContactInformation} from '../model/user-contact-information.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  userChanged = new Subject<User>();
  private user: User = null;

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/v1/user')
      .pipe(
        tap(
          users => {
            this.users = users;
            this.usersChanged.next(this.users);
          })
      );
  }

  getUser(index: number) {
    return this.getUserById(index);
  }

  getCurrentUser() {
    const currentUser: LoggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    return this.http.get<User>('http://localhost:8080/api/v1/user/' + currentUser.id)
      .pipe(
        tap(
          user => {
            this.user = user;
            this.userChanged.next(this.user);
          }
        )
      )
  }

  getUserContactInformation(contactInformationId: number) {
    return this.http.get<UserContactInformation>('http://localhost:8080/api/v1/contact_information/' + contactInformationId);
  }

  private getUserById(userId: number): User {
    for (let user of this.users) {
      if (user.id === userId) {
        return user;
      }
    }
    return null;
  }

}