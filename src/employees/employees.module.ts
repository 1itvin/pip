import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import { EmployeesService } from './employees.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { EmployeeRanksModule } from 'src/employee-ranks/employee-ranks.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesRepository, EmployeesService, PrismaService],
  imports: [RolesModule, UsersModule, EmployeeRanksModule],
  exports: [EmployeesRepository, EmployeesService],
})
export class EmployeesModule {}
