import { Component, OnInit } from '@angular/core';
import { AuthService } from '@frontend/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    console.log(
      '🚀 ~ file: sidebar.component.ts ~ line 15 ~ SidebarComponent ~ logout ~ logout'
    );
    this.authService.logout();
  }
}
