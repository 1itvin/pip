import { Exclude, Transform } from 'class-transformer';
import { CarOwnerEntity } from './car-owner.entity';

export class CarEntity {
  id: number;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;

  @Transform(({ value }) => new CarOwnerEntity(value))
  owner: CarOwnerEntity;
  @Exclude()
  ownerId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<CarEntity>) {
    Object.assign(this, partial);
  }
}
