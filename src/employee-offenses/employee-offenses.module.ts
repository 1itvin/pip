import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeOffensesController } from './employee-offenses.controller';
import { EmployeeOffensesRepository } from './employee-offenses.repository';
import { EmployeeOffensesService } from './employee-offenses.service';
import { OffensesModule } from 'src/offenses/offense.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  controllers: [EmployeeOffensesController],
  providers: [
    EmployeeOffensesRepository,
    EmployeeOffensesService,
    PrismaService,
  ],
  imports: [forwardRef(() => OffensesModule), EmployeesModule],
  exports: [EmployeeOffensesRepository, EmployeeOffensesService],
})
export class EmployeeOffensesModule {}
