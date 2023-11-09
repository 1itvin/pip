import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'login must be a string' })
  @MinLength(4, { message: 'login cannot be less than 4 characters' })
  @MaxLength(100, { message: "login's length cannot exceed 100 characters" })
  login: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password cannot be less than 6 character' })
  @MaxLength(32, { message: "password's length cannot exceed 32 characters" })
  password: string;

  @IsOptional()
  @IsInt({ message: 'roleId is not an integer value' })
  @Min(1, { message: 'roleId must not be less than 1' })
  roleId: number;
}
