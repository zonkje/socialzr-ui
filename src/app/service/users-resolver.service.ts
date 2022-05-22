import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class UsersResolverService implements Resolve<User[]>{

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.userService.getUsers();
  }
}
