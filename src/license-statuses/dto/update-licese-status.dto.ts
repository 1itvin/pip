import { CreateLicenseStatusDto } from './create-license-status.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLicenseStatusDto extends PartialType(
  CreateLicenseStatusDto,
) {}
