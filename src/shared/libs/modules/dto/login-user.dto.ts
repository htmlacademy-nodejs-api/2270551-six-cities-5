import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { EMAIL_REGEX, MAX_USER_PASSWORD_LENGTH, MIN_USER_PASSWORD_LENGTH } from '../user/user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  @Matches(EMAIL_REGEX, { message: 'wrong email' })
  public mail!: string;

  @IsString({message: 'password is required'})
  @Length(
    MIN_USER_PASSWORD_LENGTH,
    MAX_USER_PASSWORD_LENGTH,
    { message: `Min length for password is ${MIN_USER_PASSWORD_LENGTH}, max is ${MAX_USER_PASSWORD_LENGTH}` }
  )
  public password!: string;
}
