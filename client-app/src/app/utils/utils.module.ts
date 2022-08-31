import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidationMessagePipe } from './custom-validation-message.pipe';

@NgModule({
  declarations: [CustomValidationMessagePipe],
  exports: [CustomValidationMessagePipe],
  imports: [CommonModule],
})
export class UtilsModule {}
