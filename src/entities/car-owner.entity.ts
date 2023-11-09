import { Exclude, Transform } from 'class-transformer';
import { LicenseStatusEntity } from './license-status.entity';
import { UserEntity } from './user.entity';

export class CarOwnerEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;

  @Transform(({ value }) => new LicenseStatusEntity(value))
  licenseStatus: LicenseStatusEntity;
  @Exclude()
  licenseStatusId: number;

  @Transform(({ value }) => new UserEntity(value))
  user: UserEntity;
  @Exclude()
  userId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<CarOwnerEntity>) {
    Object.assign(this, partial);
  }
}
