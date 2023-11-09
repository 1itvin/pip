import { CreateOffenseDto } from './create-offense.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateOffenseDto extends OmitType(CreateOffenseDto, [
  'employeeIds',
] as const) {}
