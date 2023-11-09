import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeRanksController } from './employee-ranks.controller';
import { EmployeeRanksRepository } from './employee-ranks.repository';
import { EmployeeRanksService } from './employee-ranks.service';

@Module({
  controllers: [EmployeeRanksController],
  providers: [EmployeeRanksRepository, EmployeeRanksService, PrismaService],
  exports: [EmployeeRanksRepository, EmployeeRanksService],
})
export class EmployeeRanksModule {}
