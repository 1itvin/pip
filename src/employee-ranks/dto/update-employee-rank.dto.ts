import { CreateEmployeeRankDto } from './create-employee-rank.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeRankDto extends PartialType(CreateEmployeeRankDto) {}
