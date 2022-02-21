import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSubmitted: boolean;
  wrongAuthentication: boolean;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.loginFormSubmitted = false;
    this.wrongAuthentication = false;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  login() {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.username.value, this.password.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.wrongAuthentication = data.login;
              if (data.login) {
                this.router.navigate(['/dashboard']);
              }
            }
          },
          error => {
            console.error(error);
          });
        }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
