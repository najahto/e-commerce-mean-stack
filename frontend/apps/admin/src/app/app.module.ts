import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContentComponent } from './shared/content/content.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContentComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
