import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.loggedUserData.pipe(
      take(1),
      map(
        loggedUser => {
          const isAuth = !!loggedUser;
          if(isAuth){
            return true;
          }
          return this.router.createUrlTree(['/login']);
        }
      )
    )

  }


}
