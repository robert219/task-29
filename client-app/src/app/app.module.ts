import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule) },
        { path: 'registration', loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule) },
        { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(module => module.WelcomeModule) },
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
