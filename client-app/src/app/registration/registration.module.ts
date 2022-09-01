import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationResolver } from './registration.resolver';
import { RegistrationService } from './registration.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { InputPasswordComponent } from './input-password/input-password.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent,
        resolve: {
          formFields: RegistrationResolver,
        },
      },
    ]),
  ],
  declarations: [RegistrationComponent, InputPasswordComponent],
  providers: [RegistrationResolver, RegistrationService],
})
export class RegistrationModule {}
