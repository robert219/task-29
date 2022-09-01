import { MinLength, MaxLength, Matches } from 'class-validator';

export class RegistrationRequest {
  @MaxLength(63)
  @Matches(/^[a-zA-Z0-9]*$/)
  first_name: string;

  @MaxLength(63)
  @Matches(/^[a-zA-Z0-9]*$/)
  middle_name?: string;

  @MaxLength(63)
  @Matches(/^[a-zA-Z0-9]*$/)
  last_name: string;

  @MaxLength(46)
  @Matches(/^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$/)
  email: string;

  @MinLength(4)
  @MaxLength(10)
  @Matches(/^[0-9]+$/)
  phone_number: string;

  @MinLength(8)
  @MaxLength(15)
  @Matches(/^.*[0-9].*/)
  @Matches(/^.*[a-z].*$/)
  @Matches(/^.*[A-Z].*$/)
  password: string;
}
