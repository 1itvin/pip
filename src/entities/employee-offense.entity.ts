import { Exclude, Transform } from 'class-transformer';
import { OffenseEntity } from './offense.entity';
import { EmployeeEntity } from './employee.entity';

export class EmployeeOffenseEntity {
  @Transform(({ value }) => new OffenseEntity(value))
  offense: OffenseEntity;
  @Exclude()
  offenseId: number;

  @Transform(({ value }) => new EmployeeEntity(value))
  employee: EmployeeEntity;
  @Exclude()
  employeeId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<EmployeeOffenseEntity>) {
    Object.assign(this, partial);
  }
}
