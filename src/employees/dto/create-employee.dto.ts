import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString({ message: 'login must be a string' })
  @MinLength(4, { message: 'login cannot be less than 4 character' })
  @MaxLength(100, { message: "login's length cannot exceed 100 characters" })
  login: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password cannot be less than 1 character' })
  @MaxLength(32, { message: "password's length cannot exceed 32 characters" })
  password: string;

  @IsString({ message: 'firstName must be a string' })
  @MinLength(1, { message: 'firstName cannot be less than 1 character' })
  @MaxLength(75, { message: "firstName's length cannot exceed 75 characters" })
  firstName: string;

  @IsString({ message: 'lastName must be a string' })
  @MinLength(1, { message: 'lastName cannot be less than 1 character' })
  @MaxLength(75, { message: "lastName's length cannot exceed 75 characters" })
  lastName: string;

  @IsOptional()
  @IsString({ message: 'middleName must be a string' })
  @MinLength(1, { message: 'middleName cannot be less than 1 character' })
  @MaxLength(75, {
    message: "middleName's length cannot exceed 75 characters",
  })
  middleName: string;

  @IsInt({ message: 'rankId is not an integer value' })
  @Min(0, { message: 'rankId must not be less than 0' })
  rankId: number;
}
