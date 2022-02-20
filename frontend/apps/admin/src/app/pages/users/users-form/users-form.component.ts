import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { timer } from 'rxjs';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  isSubmitted = false;
  currentUserId: string;
  countries: any = [];

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
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.findUser(params['id']).subscribe((user) => {
          console.log(
            '🚀 ~ file: users-form.component.ts ~ line 96 ~ UsersFormComponent ~ this.usersService.findUser ~ user',
            user
          );
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
        });
      }
    });
  }

  private _createUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully',
        });
        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.editUser(this.currentUserId, user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!',
        });
        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}