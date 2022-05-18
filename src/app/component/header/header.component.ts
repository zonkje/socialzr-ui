import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private loggedUserSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedUserSub = this.authService.loggedUserData.subscribe(
      loggedUserData => {
        this.isAuthenticated = !!loggedUserData;
      }
    );
  }

  onLogout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }


}
