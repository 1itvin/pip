import { CreateCarOwnerDto } from './create-car-owner.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCarOwnerDto extends PartialType(CreateCarOwnerDto) {}
