import { IsInt, Min } from 'class-validator';

export class CreateEmployeeOffenseDto {
  @IsInt({ message: 'offenseId must be an integer' })
  @Min(0, { message: 'offenseId must not be less than 0' })
  offenseId: number;

  @IsInt({ message: 'employeeId must be an integer' })
  @Min(0, { message: 'employeeId must not be less than 0' })
  employeeId: number;
}
