import { Exclude } from 'class-transformer';

export class LicenseStatusEntity {
  id: number;
  name: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<LicenseStatusEntity>) {
    Object.assign(this, partial);
  }
}
