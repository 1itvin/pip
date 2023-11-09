import { Exclude } from 'class-transformer';

export class EmployeeRankEntity {
  id: number;
  name: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<EmployeeRankEntity>) {
    Object.assign(this, partial);
  }
}
