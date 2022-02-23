import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  getCountryName(countryKey: string): any {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`/users/form/${id}`);
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService
          .deleteUser(id)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
            () => {
              this._getUsers();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'User deleted',
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User is not deleted!',
              });
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'You have cancelled',
        });
      },
    });
  }

  private _getUsers() {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
