import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationResolver } from './registration.resolver';
import { RegistrationService } from './registration.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
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
  declarations: [RegistrationComponent],
  providers: [RegistrationResolver, RegistrationService],
})
export class RegistrationModule {}
