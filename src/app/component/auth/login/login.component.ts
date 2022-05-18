import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInRequest} from '../../../model/auth/sign-in-request.model';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (!this.signInForm.valid) {
      return;
    }
    const username = this.signInForm.get('username').value;
    const password = this.signInForm.get('password').value;
    let signInRequest = new SignInRequest(username, password);

    this.isLoading = true;

    this.authService.signIn(signInRequest)
      .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(['/']);

      }, error => {
        this.isLoading = false;
        alert(error.error.messages);
      });

  }

}
