import { Exclude, Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;

  login: string;
  @Exclude()
  password: string;

  @Transform(({ value }) => new RoleEntity(value))
  role: RoleEntity;
  @Exclude()
  roleId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
