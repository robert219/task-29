import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { IsRegisteredGuard } from './guards/is-registered.guard';
import { IsNotRegisteredGuard } from './guards/is-not-registered.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsNotRegisteredGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: 'registration',
    canActivate: [IsNotRegisteredGuard],
    loadChildren: () =>
      import('./registration/registration.module').then(
        (module) => module.RegistrationModule
      ),
  },
  {
    path: 'welcome',
    canActivate: [IsRegisteredGuard],
    loadChildren: () =>
      import('./welcome/welcome.module').then((module) => module.WelcomeModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NoopAnimationsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
