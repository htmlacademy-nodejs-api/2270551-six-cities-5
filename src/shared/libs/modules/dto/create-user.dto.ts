import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength, IsEnum, Matches } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';
import { EMAIL_REGEX, MAX_USER_NAME_LENGTH, MAX_USER_PASSWORD_LENGTH, MIN_USER_NAME_LENGTH,MIN_USER_PASSWORD_LENGTH } from '../user/user.constant.js';

export default class CreateUserDto {
  @IsString({ message: 'name is required' })
  @MinLength(MIN_USER_NAME_LENGTH, { message: `Min user name length is ${MIN_USER_NAME_LENGTH}` })
  @MaxLength(MAX_USER_NAME_LENGTH, { message: `Max user name length is ${MAX_USER_NAME_LENGTH}` })
  public name!: string;

  @IsEmail({}, { message: 'email must be valid address' })
  @Matches(EMAIL_REGEX, { message: 'wrong email' })
  public mail!: string;

  @IsString({message: 'avatar path is required'})
  @IsUrl(undefined, { message: 'avatar URL is not valid.' })
  public avatar?: string;

  @IsString({message: 'password is required'})
  @Length(
    MIN_USER_PASSWORD_LENGTH,
    MAX_USER_PASSWORD_LENGTH,
    { message: `Min length for password is ${MIN_USER_PASSWORD_LENGTH}, max is ${MAX_USER_PASSWORD_LENGTH}` }
  )
  public password!: string;

  @IsEnum(UserType, { message: 'Wrong UserType' })
  public type!: UserType;
}

