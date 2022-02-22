import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormSubmitted: boolean;
  confirmPasswordValidation: boolean;
  constructor(private router:Router,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.confirmPasswordValidation = true;
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  register() {
    this.registerFormSubmitted = true;
    if (!this.isPasswordAndConfirmPasswordSame()) {
      this.confirmPasswordValidation = false;
      return;
    }

    if (this.registerForm.valid) {
      this.authenticationService.register(this.username.value, this.password.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (data.data) {
              this.router.navigate(['/dashboard']);
            }
          },
          error => {
            console.error(error);
            this.authenticationService.loginBtnSpinner.emit(false);
          });
        }
  }

  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  isPasswordAndConfirmPasswordSame() {
    return this.password.value != this.confirmPassword.value ? false : true;
  }
}
