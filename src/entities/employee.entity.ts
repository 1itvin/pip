import { Exclude, Transform } from 'class-transformer';
import { EmployeeRankEntity } from './employee-rank.entity';
import { UserEntity } from './user.entity';

export class EmployeeEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;

  @Transform(({ value }) => new EmployeeRankEntity(value))
  rank: EmployeeRankEntity;
  @Exclude()
  rankId: number;

  @Transform(({ value }) => new UserEntity(value))
  user: UserEntity;
  @Exclude()
  userId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<EmployeeEntity>) {
    Object.assign(this, partial);
  }
}
