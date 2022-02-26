import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  showLoginAlert = false;
  isLoading = false;
  authMessage: string;
  authMessageSeverity = 'info';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    // show loading alert
    this.showLoginAlert = true;
    this.isLoading = true;
    this.authMessageSeverity = 'info';
    this.authMessage = 'Please wait! We are logging you in.';

    this.authService
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe({
        next: (user) => {
          this.localStorageService.setToken(user.token);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.authMessageSeverity = 'error';
          this.authMessage = 'Incorrect email or password';
          if (error.status != 400) {
            this.authMessage = 'Error in the server, please try again later';
          }
        },
        complete: () => {
          this.authMessageSeverity = 'success';
          this.authMessage = 'Success! Your account now logged in.';
          this.router.navigate(['/']);
        },
      });
  }

  private _initForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
