import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@frontend/products';
import { UiModule } from '@frontend/ui';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@frontend/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [MessagesComponent],
})
export class AppModule {}
