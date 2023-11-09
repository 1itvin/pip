import { Prisma } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { CarOwnerEntity } from './car-owner.entity';
import { CarEntity } from './car.entity';

export class OffenseEntity {
  id: number;
  title: string;
  description?: string;

  @Transform(({ value }) => +value)
  fine: Prisma.Decimal;

  @Transform(({ value }) => new CarOwnerEntity(value))
  suspect: CarOwnerEntity;
  @Exclude()
  suspectId: number;

  @Transform(({ value }) => new CarEntity(value))
  car: CarEntity;
  @Exclude()
  carId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<OffenseEntity>) {
    Object.assign(this, partial);
  }
}
