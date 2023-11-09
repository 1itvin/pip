import { Exclude } from 'class-transformer';

export class RoleEntity {
  id: number;
  name: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
