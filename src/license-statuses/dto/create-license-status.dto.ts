import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLicenseStatusDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(1, { message: 'name cannot be less than 1 character' })
  @MaxLength(75, { message: "name's length cannot exceed 75 characters" })
  name: string;
}
