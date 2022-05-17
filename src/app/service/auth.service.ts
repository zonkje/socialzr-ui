import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpRequest} from '../model/auth/sign-up-request.model';
import {User} from '../model/user.model';
import {SignInRequest} from '../model/auth/sign-in-request.model';

interface SignInResponse {
  'id': string,
  'username': string,
  'role': string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(newUser: SignUpRequest) {
    return this.http.post<User>('http://localhost:8080/api/v1/sign_up', newUser);
  }

  signIn(userCredentials: SignInRequest) {
    return this.http.post<SignInResponse>('http://localhost:8080/api/v1/login',
      userCredentials,
      {observe: 'response'});
  }

  logOut() {

  }

}
