import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { LayoutComponent } from './Admin/layout/layout.component';
import { CompanyCardComponent } from './Admin/company-card/company-card.component';
import { App } from './app';
import { HeaderComponent } from './shared/Compentent/header/header.component';
import { HomeComponent } from './Admin/home/home.component';

@NgModule({
  declarations: [App],
  imports: [
    
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    LayoutComponent,
    HeaderComponent,
    CompanyCardComponent
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule {}
