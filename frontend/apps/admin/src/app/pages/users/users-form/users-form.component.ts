import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode = false;
  isSubmitted = false;
  currentUserId: string;
  countries: any = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };

    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._createUser(user);
    }
  }

  get userForm() {
    return this.form.controls;
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
      isAdmin: [false],
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.findUser(params['id']).subscribe({
          next: (user) => {
            this.userForm['name'].setValue(user.name);
            this.userForm['email'].setValue(user.email);
            this.userForm['phone'].setValue(user.phone);
            this.userForm['isAdmin'].setValue(user.isAdmin);
            this.userForm['street'].setValue(user.street);
            this.userForm['apartment'].setValue(user.apartment);
            this.userForm['zip'].setValue(user.zip);
            this.userForm['city'].setValue(user.city);
            this.userForm['country'].setValue(user.country);

            this.userForm['password'].setValidators([]);
            this.userForm['password'].updateValueAndValidity();
          },
        });
      }
    });
  }

  private _createUser(user: User) {
    this.usersService
      .createUser(user)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User created successfully',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not created!',
          });
        },
        complete: () => {
          timer(2000).subscribe({
            complete: () => {
              this.location.back();
            },
          });
        },
      });
  }

  private _updateUser(user: User) {
    this.usersService
      .editUser(this.currentUserId, user)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User is updated!',
          });
          timer(2000).subscribe({
            next: () => {
              this.location.back();
            },
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not updated!',
          });
        },
      });
  }

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
