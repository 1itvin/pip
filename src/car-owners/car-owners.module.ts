import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CarOwnersController } from './car-owners.controller';
import { CarOwnersRepository } from './car-owners.repository';
import { CarOwnersService } from './car-owners.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { LicenseStatusesModule } from 'src/license-statuses/license-statuses.module';

@Module({
  controllers: [CarOwnersController],
  providers: [CarOwnersRepository, CarOwnersService, PrismaService],
  exports: [CarOwnersRepository, CarOwnersService],
  imports: [UsersModule, RolesModule, LicenseStatusesModule],
})
export class CarOwnersModule {}
