import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable({})
export class RolesRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllRoles(): Promise<Role[]> {
    return this.prismaService.role.findMany();
  }

  async getRoleById(id: number): Promise<Role> {
    return this.prismaService.role.findFirst({
      where: { id },
    });
  }

  async getRoleByName(name: string): Promise<Role> {
    return this.prismaService.role.findFirst({
      where: { name },
    });
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    return this.prismaService.role.create({
      data: role,
    });
  }

  async updateRoleById(id: number, role: UpdateRoleDto): Promise<Role> {
    return this.prismaService.role.update({
      where: { id },
      data: role,
    });
  }

  async deleteRoleById(id: number): Promise<Role> {
    return this.prismaService.role.delete({
      where: { id },
    });
  }
}
