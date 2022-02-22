import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

export const usersRoutes: Route[] = [];

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

const UX_MODULE = [
  InputTextModule,
  ButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MessageModule,
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ...UX_MODULE],
  declarations: [LoginComponent],
  providers: [MessageService],
})
export class UsersModule {}
