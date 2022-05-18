import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpRequest} from '../../../model/auth/sign-up-request.model';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    let imgUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'avatarUrl': new FormControl(null, Validators.pattern(imgUrlRegex || null)),
    });
  }

  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const username = this.signUpForm.get('username').value;
    const password = this.signUpForm.get('password').value;
    const firstName = this.signUpForm.get('firstName').value;
    const lastName = this.signUpForm.get('lastName').value;
    const avatarUrl = this.signUpForm.get('avatarUrl').value;
    let signUpRequestData = new SignUpRequest(username, password, firstName, lastName, avatarUrl);

    this.isLoading = true;

    this.authService.signUp(signUpRequestData)
      .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }, error => {
        this.isLoading = false;
        alert(error.error.messages);
      });
  }

}
