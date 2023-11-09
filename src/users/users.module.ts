import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, PrismaService],
  exports: [UsersRepository, UsersService],
  imports: [RolesModule],
})
export class UsersModule {}
