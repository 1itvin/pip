import { CreateEmployeeOffenseDto } from './create-employee-offenses.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeOffenseDto extends PartialType(
  CreateEmployeeOffenseDto,
) {}
