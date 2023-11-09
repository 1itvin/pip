import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsOptional()
  @IsString({ message: 'brand must be a string' })
  @MinLength(1, { message: 'brand must not be less than 1 character' })
  @MaxLength(75, { message: "brand's length must not exceed 75 characters" })
  brand?: string;

  @IsOptional()
  @IsString({ message: 'model must be a string' })
  @MinLength(1, { message: 'model must not be less than 1 character' })
  @MaxLength(75, { message: "model's length must not exceed 75 characters" })
  model?: string;

  @IsOptional()
  @IsString({ message: 'color must be a string' })
  @MinLength(1, { message: 'color must not be less than 1 character' })
  @MaxLength(75, {
    message: "color's length must not exceed 75 characters",
  })
  color?: string;

  @IsOptional()
  @IsInt({ message: 'year must be an integer' })
  @Min(0, { message: 'year must not be less than 0' })
  @Max(9999, { message: 'year must not be more than 9999' })
  year: number;

  @IsInt({ message: 'ownerId must be an integer' })
  @Min(0, { message: 'ownerId must not be less than 0' })
  ownerId: number;
}
