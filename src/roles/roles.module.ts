import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesRepository, RolesService, PrismaService],
  exports: [RolesRepository, RolesService],
})
export class RolesModule {}
