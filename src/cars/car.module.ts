import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CarsController } from './car.controller';
import { CarsRepository } from './car.repository';
import { CarsService } from './car.service';
import { CarOwnersModule } from 'src/car-owners/car-owners.module';

@Module({
  controllers: [CarsController],
  providers: [CarsRepository, CarsService, PrismaService],
  imports: [CarOwnersModule],
  exports: [CarsRepository, CarsService],
})
export class CarsModule {}
