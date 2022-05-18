import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpRequest} from '../model/auth/sign-up-request.model';
import {User} from '../model/user.model';
import {SignInRequest} from '../model/auth/sign-in-request.model';
import {BehaviorSubject} from 'rxjs';
import {tap, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SignInResponse} from '../model/auth/sign-in-response.model';


@Injectable({providedIn: 'root'})
export class AuthService {

  loggedUserData = new BehaviorSubject<SignInResponse>(null);
  token = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signUp(newUser: SignUpRequest) {
    return this.http.post<User>('http://localhost:8080/api/v1/sign_up', newUser);
  }

  signIn(userCredentials: SignInRequest) {
    return this.http.post<SignInResponse>('http://localhost:8080/api/v1/login',
      userCredentials,
      {observe: 'response'})
      .pipe(
        tap(responseData => {
          this.loggedUserData.next(responseData.body);
          this.token.next(responseData.headers.get('Authorization'));
          localStorage.setItem('token', responseData.headers.get('Authorization'));
          localStorage.setItem('loggedUserData', JSON.stringify(responseData.body));
        })
      );
  }

  autoLogin() {
    const loggedUserData: SignInResponse = JSON.parse(localStorage.getItem('loggedUserData'));
    const token: string = localStorage.getItem('token');
    if (!loggedUserData) {
      return;
    }
      this.loggedUserData.next(loggedUserData);
      this.token.next(token);
  }

  logOut() {
    this.loggedUserData.next(null);
    this.token.next(null);
    localStorage.removeItem('loggedUserData');
    this.router.navigate(['/login']);
  }

}
