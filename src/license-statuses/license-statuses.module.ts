import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LicenseStatusesController } from './license-statuses.controller';
import { LicenseStatusesRepository } from './license-statuses.repository';
import { LicenseStatusesService } from './license-statuses.service';

@Module({
  controllers: [LicenseStatusesController],
  providers: [LicenseStatusesRepository, LicenseStatusesService, PrismaService],
  exports: [LicenseStatusesRepository, LicenseStatusesService],
})
export class LicenseStatusesModule {}
