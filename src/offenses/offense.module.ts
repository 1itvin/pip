import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OffensesController } from './offense.controller';
import { OffensesRepository } from './offense.repository';
import { OffensesService } from './offense.service';
import { CarsModule } from 'src/cars/car.module';
import { CarOwnersModule } from 'src/car-owners/car-owners.module';
import { EmployeeOffensesModule } from 'src/employee-offenses/employee-offenses.module';

@Module({
  controllers: [OffensesController],
  providers: [OffensesRepository, OffensesService, PrismaService],
  exports: [OffensesRepository, OffensesService],
  imports: [
    CarsModule,
    CarOwnersModule,
    forwardRef(() => EmployeeOffensesModule),
  ],
})
export class OffensesModule {}
