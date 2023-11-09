import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOffenseDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(1, { message: 'title must not be less than 1 character' })
  @MaxLength(75, { message: "title's length must not exceed 75 characters" })
  title: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @MinLength(1, { message: 'description must not be less than 1 character' })
  @MaxLength(200, {
    message: "description's length must not exceed 200 characters",
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fine?: number;

  @IsInt({ message: 'suspectId must be an integer' })
  @Min(0, { message: 'suspectId must not be less than 0' })
  suspectId: number;

  @IsInt({ message: 'carId must be an integer' })
  @Min(0, { message: 'carId must not be less than 0' })
  carId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ message: 'employeeIds must be integers', each: true })
  @Min(0, { message: 'employeeIds must not be less than 0', each: true })
  employeeIds: number[] = [];
}
