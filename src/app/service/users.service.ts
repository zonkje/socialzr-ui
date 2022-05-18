import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {LoggedUserData} from '../model/auth/logged-user-data.model';
import {UserContactInformation} from '../model/user-contact-information.model';

@Injectable()
export class UsersService {

  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  constructor(private http: HttpClient) {
  }

  getCurrentUser() {
    const currentUser: LoggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    return this.http.get<User>('http://localhost:8080/api/v1/user/' + currentUser.id);
  }

  getCurrentUserContactInformation(contactInformationId: number) {
    return this.http.get<UserContactInformation>('http://localhost:8080/api/v1/contact_information/' + contactInformationId);
  }

}
