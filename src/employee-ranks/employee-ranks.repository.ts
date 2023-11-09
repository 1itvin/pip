import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmployeeRankDto } from './dto/create-employee-rank.dto';
import { UpdateEmployeeRankDto } from './dto/update-employee-rank.dto';
import { EmployeeRank } from '@prisma/client';

@Injectable({})
export class EmployeeRanksRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllEmployeeRanks(): Promise<EmployeeRank[]> {
    return this.prismaService.employeeRank.findMany();
  }

  async getEmployeeRankById(id: number): Promise<EmployeeRank> {
    return this.prismaService.employeeRank.findFirst({
      where: { id },
    });
  }

  async createEmployeeRank(
    employeeRank: CreateEmployeeRankDto,
  ): Promise<EmployeeRank> {
    return this.prismaService.employeeRank.create({
      data: employeeRank,
    });
  }

  async updateEmployeeRankById(
    id: number,
    employeeRank: UpdateEmployeeRankDto,
  ): Promise<EmployeeRank> {
    return this.prismaService.employeeRank.update({
      where: { id },
      data: employeeRank,
    });
  }

  async deleteEmployeeRankById(id: number): Promise<EmployeeRank> {
    return this.prismaService.employeeRank.delete({
      where: { id },
    });
  }
}
