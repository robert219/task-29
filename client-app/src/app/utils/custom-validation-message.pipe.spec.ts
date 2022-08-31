import { CustomValidationMessagePipe } from './custom-validation-message.pipe';

describe('CustomValidationMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomValidationMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
